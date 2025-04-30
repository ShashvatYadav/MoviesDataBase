import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoviesCard from "./MoviesCard";

const MoviesList = ({ movies, searchQuery, setSearchQuery, loading }) => {
  const [sortBy, setSortBy] = useState("title-asc");
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);
  
  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.movie.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort movies based on selected option
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "title-asc":
        return a.movie.localeCompare(b.movie);
      case "title-desc":
        return b.movie.localeCompare(a.movie);
      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  // Check if a movie is in favorites
  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-3 sm:mb-4">
            Movie Database
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6 max-w-2xl px-4">
            Explore our collection of movies. Search, sort, and save your favorites!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <div className="flex items-center w-full md:w-auto">
            <label htmlFor="sort" className="mr-2 text-gray-700 font-medium whitespace-nowrap">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow md:flex-grow-0"
            >
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="rating-asc">Rating (Low to High)</option>
              <option value="rating-desc">Rating (High to Low)</option>
            </select>
          </div>
        </div>
        
        {sortedMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <Link
                  to={`/movie/${movie.id}`}
                  className="transform hover:scale-105 transition-transform duration-200 h-full flex"
                >
                  <MoviesCard movie={movie} />
                </Link>
                {isFavorite(movie.id) && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
              No movies found matching "{searchQuery}"
            </p>
            <p className="text-gray-500 mb-4 px-4">
              Try adjusting your search or browse our movie collection
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
        
        {movies.length > 0 && filteredMovies.length === 0 && (
          <div className="text-center mt-8">
            <button 
              onClick={() => setSearchQuery('')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;

