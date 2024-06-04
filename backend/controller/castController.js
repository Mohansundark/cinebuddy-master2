const axios = require("axios");
require("dotenv").config();

const getMovieCast = async (req, res) => {
  const { movieId } = req.params;
  const endPoint = `movie/${movieId}/credits?`;
  const cast_apiUrl = `${process.env.BASE_URL}${endPoint}api_key=${process.env.TMDB_API}`;
  console.log(`cast api url: ${cast_apiUrl}`);
  try {
      // Make a request to the TMDb API for cast details
      
    const response = await axios.get(cast_apiUrl);

    // Log the constructed cast API URL and the response data
    console.log(cast_apiUrl);
    // console.log(response.data);

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cast data" });
  }
};

module.exports = {
  getMovieCast,
};
