import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoviesCard from "./MoviesCard";

const MoviesList = ({ movies, searchQuery, setSearchQuery }) => {
  const filteredMovies = movies.filter((movie) =>
    movie.movie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Movie Database
      </h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <MoviesCard movie={movie} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No movies found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default MoviesList;

