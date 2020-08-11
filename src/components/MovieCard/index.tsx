import * as React from "react";
import { movieObject } from "../MovieList";
import axios from "axios";
import { useQuery } from "react-query";
import { API_KEY } from "../../config";

export interface MovieProps {
  movie: movieObject;
  close: () => void;
}

interface omdbMovieResponse {
  Released: string;
  Genre: string;
  Runtime: string;
  Ratings: Array<{ Source: string; Value: string }>;
}

const MovieCard: React.SFC<MovieProps> = ({ movie, close }) => {
  const fetchMovie = async () => {
    const result = await axios.get<omdbMovieResponse>(
      `/.netlify/functions/?i=${movie.imdbID}`
    );
    return result.data;
  };

  const {
    isLoading,
    isError,
    data: {
      Released = null,
      Genre = null,
      Runtime = null,
      Ratings = null,
    } = {},
  } = useQuery(movie.imdbID, fetchMovie);

  const tomatoRating = Ratings?.find(
    (review) => review.Source === "Rotten Tomatoes"
  )?.Value;

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div
        className='w-3/4 max-w-xl max-h-1/2 flex flex-no-wrap relative m-auto
        rounded overflow-hidden shadow-lg bg-gray-300 border-solid border-2 border-gray-600 '
      >
        <img
          className='object-cover flex-1'
          src={movie.Poster}
          alt='Sunset in the mountains'
        />
        <div className='px-6 py-4 flex-1 overflow-y-auto'>
          <div className='float-right m-2' />
          <div className='font-bold text-xl mb-2'>
            {movie.Title} <i>({movie.Year})</i>
          </div>
          <div className='text-gray-700 text-base leading-loose'>
            {isLoading ? (
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='clock w-6 h-6 animate-spin'
                data-darkreader-inline-fill=''
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                  clipRule='evenodd'
                ></path>
              </svg>
            ) : isError ? (
              <p>Couldn't load information :/</p>
            ) : (
              <>
                <p>
                  <b>Released date:</b> {Released}
                </p>
                <p>
                  <b>Genre:</b> {Genre}
                </p>
                <p>
                  <b>Runtime:</b> {Runtime}
                </p>
                {tomatoRating ? (
                  <p>
                    <b>Rotten tomatoes: </b> {tomatoRating}{" "}
                    <span role='img' aria-label='tomato'>
                      🍅
                    </span>
                  </p>
                ) : (
                  <p>
                    <span role='img' aria-label='tomato'>
                      🍅
                    </span>{" "}
                    No Rotten tomatoes rating was found
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className='absolute top-0 right-0'>
          <button
            className='button m-2 relative flex items-center justify-center p-1'
            onClick={close}
          >
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='x w-5 h-5'
              data-darkreader-inline-fill=''
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
