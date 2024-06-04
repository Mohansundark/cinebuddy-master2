const movieDetails = ({ movie }) => {
  // Format release date
  const releaseDate = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h4 className="movie-title">{movie.title}</h4>
      <p>
        <strong>Date : </strong>
        {releaseDate}
      </p>
      <p>
        <strong>Language: </strong>
        {movie.original_language}
      </p>
      <p>
        <strong>Rating: </strong>
        {movie.vote_average}
      </p>
    </div>
  );
};

export default movieDetails;
