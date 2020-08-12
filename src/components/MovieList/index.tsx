import { useParams } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { API_KEY } from "../../config";
import { usePaginatedQuery } from "react-query";
import Modal from "../Layout/Modal";
import MovieCard from "../MovieCard";
import { Helmet } from "react-helmet";

export interface movieObject {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

type Search = Array<movieObject>;

interface omdbResponse {
  Search?: Search;
  totalResults?: number;
  Error?: string;
}

const MovieList: React.SFC = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const [movie, setMovie] = useState<movieObject | null>(null);

  const fetchMovies = async () => {
    const result = await axios.get<omdbResponse>(
      `http://www.omdbapi.com/?s=${id.replace(
        /\s/,
        "+"
      )}&page=${page}&apikey=${API_KEY}`
    );
    return result.data;
  };

  const {
    isError,
    resolvedData: {
      Search: search = null,
      totalResults = 0,
      Error = null,
    } = {},
    latestData,
  } = usePaginatedQuery([id, page], fetchMovies);

  function displayModal(movie: movieObject): void {
    setMovie(movie);
  }

  const availablePage = (page: number): boolean =>
    page > 0 && page * 10 - totalResults < 10;

  const previousPageDisabled = !availablePage(page - 1);
  const nextPageDisabled = !availablePage(page + 1) || latestData === undefined;
  const previousPage = () => {
    !previousPageDisabled && setPage(page - 1);
  };
  const nextPage = () => {
    !nextPageDisabled && setPage(page + 1);
  };

  const pageInfo = `Results ${page * 10 - 10}-${page * 10} of ${totalResults}`;

  const renderMovieList = (search: Search) =>
    search.map((movie, index) => (
      <li
        className=' text-gray-700 p-2 font-bold cursor-pointer flex justify-between'
        key={`${movie.imdbID}${index}`}
        onClick={() => displayModal(movie)}
      >
        <span>{movie.Title}</span> <i className='font-normal'> ({movie.Year})</i>
      </li>
    ));

  const closeModal = () => setMovie(null);

  return (
    (id && search && (
      <>
        <Helmet>
          <title>Movie Searcher: {id}</title>
        </Helmet>
        <main className='my-2 bg-gray-400 mx-2 max-w-lg rounded overflow-hidden shadow-lg p-1 w-full'>
          <ul className='divide-y divide-gray-700 divide-opacity-50'>
            {renderMovieList(search)}
          </ul>
        </main>
        <section className='flex justify-between max-w-lg w-full flex-wrap'>
          <button
            className={`button ${previousPageDisabled && "bg-gray-600"}`}
            onClick={previousPage}
            disabled={previousPageDisabled}
          >
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='chevron-double-left w-6 h-6'
              data-darkreader-inline-fill=''
            >
              <path
                fillRule='evenodd'
                d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <div
            className='p-2 bg-gray-400 items-center text-gray-700 rounded-full inline-flex'
            role='alert'
          >
            <span className='font-semibold mx-1'>{pageInfo}</span>
          </div>
          <button
            className={`button ${nextPageDisabled && "bg-gray-600"}`}
            onClick={nextPage}
            disabled={nextPageDisabled}
          >
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='chevron-double-right w-6 h-6'
              data-darkreader-inline-fill=''
            >
              <path
                fillRule='evenodd'
                d='M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              ></path>
              <path
                fillRule='evenodd'
                d='M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </section>
        {movie && (
          <Modal>
            <MovieCard movie={movie} close={closeModal} />
          </Modal>
        )}
      </>
    )) ||
    ((Error || isError) && (
      <div
        className='p-2 bg-gray-400 items-center text-gray-700 rounded-full inline-flex m-2'
        role='alert'
      >
        <span className='font-semibold mx-1'>
          {Error || `Couldn't fetch from OMDb :(`}
        </span>
      </div>
    )) ||
    null
  );
};

export default MovieList;
