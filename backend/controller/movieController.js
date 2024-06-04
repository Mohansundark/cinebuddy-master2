// movieController.js
const axios = require("axios");
require("dotenv").config();

const getMovieDetails = async (req, res) => {
  const { title } = req.body;
  const endPoint = "search/movie?";
  const movie_apiUrl = `${process.env.BASE_URL}${endPoint}api_key=${process.env.TMDB_API}&query=${title}`;

  try {
    // Make a request to the TMDb API
    const response = await axios.get(movie_apiUrl);

    // Log the constructed movie API URL and the response data
    console.log(movie_apiUrl);
    // console.log(response.data);

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
};

module.exports = {
  getMovieDetails,
};
