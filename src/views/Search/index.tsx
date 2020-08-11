import React, { useState } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList";

function App() {
  const location = useLocation().pathname.slice(1);
  const [searchString, setSearchString] = useState(
    location.replace(/\+/g, " ")
  );
  let history = useHistory();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    history.push(`/${searchString.replace(/\s/, "+")}`);
  };
  return (
    <>
      <Route path='/'>
        <header className='bg-gray-400 mx-2 max-w-lg rounded overflow-hidden shadow-lg p-2 w-full'>
          <form onSubmit={handleSubmit}>
            <label
              className='block text-gray-700 text-lg font-bold mb-2'
              htmlFor='searchString'
            >
              Search a movie
            </label>
            <input
              className='mb-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={searchString}
              type='text'
              id='searchString'
              name='searchString'
              onChange={(event) => setSearchString(event.target.value)}
            />
            <button className='button w-full' type='submit'>
              Go!
            </button>
          </form>
        </header>
      </Route>
      <Route path='/:id'>
        <MovieList />
      </Route>
    </>
  );
}

export default App;
