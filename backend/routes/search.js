const express = require("express");
const { getMovieDetails } = require("../controller/movieController");
const { getMovieCast } = require("../controller/castController");
const router = express.Router();

router.post("/movies", getMovieDetails);
router.get("/movies/:movieId/cast", getMovieCast);
module.exports = router;
