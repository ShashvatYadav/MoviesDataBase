import React from "react";

const MoviesCard = ({ movie }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={movie.image}
        alt={movie.movie}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {movie.movie}
        </h3>
        <p className="text-sm text-gray-500 mb-4">Rating: {movie.rating}</p>
        <button className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MoviesCard;

