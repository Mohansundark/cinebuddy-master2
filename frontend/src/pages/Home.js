// src/pages/Home.js

import React, { useState, useEffect } from "react";
import MovieDetails from "../components/MovieDetails";
import languages from "../components/languages";
import FilterBar from "../components/FilterBar"; // Import the FilterBar component
import Modal from "../components/Modal"; // Import the Modal component

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [activeMovie, setActiveMovie] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Reset the error state before starting the search

    try {
      const response = await fetch("/api/search/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch movies");
      }

      const json = await response.json();
      setMovies(json.results);
    } catch (error) {
      console.error(error);
      setError(
        error.message || "An unexpected error occurred during the movie search."
      );
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguageFilter(e.target.value);
  };

  const filterMoviesByLanguage = () => {
    if (!movies) return [];
    if (languageFilter === "all") return movies;
    return movies.filter((movie) => movie.original_language === languageFilter);
  };

  useEffect(() => {
    if (title) {
      handleSearch();
    }
  }, [title]);

  const handleMovieClick = async (movieId) => {
    if (activeMovie && activeMovie.id === movieId) {
      setActiveMovie(null);
      return;
    }

    setLoading(true);
    setError(null); // Reset the error state before fetching cast details

    try {
      console.log("Getting the movieID:", movieId);
      const response = await fetch(`/api/search/movies/${movieId}/cast`);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch cast details");
      }

      const json = await response.json();
      const updatedMovies = movies.map((movie) =>
        movie.id === movieId ? { ...movie, cast: json.cast } : movie
      );
      setMovies(updatedMovies);
      setActiveMovie(updatedMovies.find((movie) => movie.id === movieId));
    } catch (error) {
      console.error(error);
      setError(
        error.message ||
          "An unexpected error occurred while fetching cast details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setActiveMovie(null);
  };

  return (
    <div className="home">
      <h1 style={{ textAlign: "center" }}>Welcome to CineBuddy</h1>
      {/* Render the FilterBar component */}
      <FilterBar
        title={title}
        setTitle={setTitle}
        handleSearch={handleSearch}
        languageFilter={languageFilter}
        handleLanguageChange={handleLanguageChange}
      />
      {/* Your existing code */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div className="movie-list">
          {filterMoviesByLanguage().map((movie) => (
            <div
              key={movie.id}
              className="movie-details"
              onClick={() => handleMovieClick(movie.id)}
            >
              <MovieDetails movie={movie} />
            </div>
          ))}
        </div>
      )}
      {activeMovie && (
        <Modal
          show={!!activeMovie}
          onClose={handleCloseModal}
          backdropPath="https://th.bing.com/th/id/OIP.m8qb6rcx5YqLCIVPLEHIvAHaHa?rs=1&pid=ImgDetMain"
        >
          <MovieDetails movie={activeMovie} />
          {activeMovie.cast && (
            <div className="cast-details">
              <h4>Cast</h4>
              <ul>
                {activeMovie.cast.map((castMember) => (
                  <li key={castMember.id} className="cast-member">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                      alt={castMember.name}
                      className="cast-image"
                    />
                    <div>
                      <p>{castMember.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Home;
