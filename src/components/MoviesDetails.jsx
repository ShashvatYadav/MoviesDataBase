import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyapi.online/api/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  if (!movie)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={movie.image}
          alt={movie.movie}
          className="w-full h-96 object-cover"
        />
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{movie.movie}</h2>
          <p className="text-gray-600 text-lg mb-6">Rating: {movie.rating}</p>
          <a
            href={movie.imdb_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 hover:text-blue-500 border-2 border-blue-500 transition-colors"
          >
            View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;



