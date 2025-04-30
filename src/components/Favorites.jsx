import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MoviesCard from './MoviesCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    setLoading(false);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        My Favorite Movies
      </h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative group">
              <Link
                to={`/movie/${movie.id}`}
                className="transform hover:scale-105 transition-transform duration-200"
              >
                <MoviesCard movie={movie} />
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(movie.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Favorites Yet</h2>
          <p className="text-gray-500 mb-6">You haven't added any movies to your favorites list yet.</p>
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Explore Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites; 