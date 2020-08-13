exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World'
  })
};


exports.handler = function (event, context, callback) {
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
};
