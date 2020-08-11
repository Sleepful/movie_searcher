exports.handler = function (event, context, callback) {
  const fetchMovie = async () => {
    const result =
      (await axios.get) <
      omdbMovieResponse >
      `/.netlify/functions/?i=${movie.imdbID}&apikey=${API_KEY}`;
    return result.data;
  };
};
