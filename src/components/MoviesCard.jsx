import React from "react";

const MoviesCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col w-full">
      <div className="relative pb-[140%] sm:pb-[150%]">
        <img
          src={movie.image}
          alt={movie.movie}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-sm font-medium rounded-br-lg">
          {movie.rating}
        </div>
      </div>
      <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {movie.movie}
        </h3>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
          <span className="text-xs sm:text-sm text-gray-600">
            {movie.year || "Unknown year"}
          </span>
          <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium truncate max-w-[120px]">
            {movie.genre || "Movie"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;

