const fetchMovies = async () => {
  const result =
    (await axios.get) <
    omdbResponse >
    `http://www.omdbapi.com/?s=${id.replace(
      /\s/,
      "+"
    )}&page=${page}&apikey=${API_KEY}`;
  return result.data;
};

const fetchMovie = async () => {
  const result =
    (await axios.get) <
    omdbMovieResponse >
    `/.netlify/functions/?i=${movie.imdbID}&apikey=${API_KEY}`;
  return result.data;
};
