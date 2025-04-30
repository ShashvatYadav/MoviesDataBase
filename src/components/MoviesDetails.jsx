import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=cfe422613b250f702980a3bbf9e90716`)
      .then((response) => {
        // Transform the data to match our expected format
        const transformedData = {
          id: response.data.id,
          movie: response.data.title,
          rating: response.data.vote_average,
          image: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
          description: response.data.overview,
          year: response.data.release_date ? response.data.release_date.substring(0, 4) : "",
          imdb_url: `https://www.themoviedb.org/movie/${response.data.id}`,
          director: response.data.production_companies?.[0]?.name || "",
          genre: response.data.genres?.map(g => g.name).join(', ') || "Unknown",
          cast: []
        };
        
        // Also fetch credits to get cast info
        return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=cfe422613b250f702980a3bbf9e90716`)
          .then(creditsResponse => {
            // Add cast members if available
            if (creditsResponse.data.cast && creditsResponse.data.cast.length > 0) {
              transformedData.cast = creditsResponse.data.cast.slice(0, 5).map(actor => actor.name);
            }
            
            // Find director if available
            const director = creditsResponse.data.crew?.find(person => person.job === "Director");
            if (director) {
              transformedData.director = director.name;
            }
            
            setMovie(transformedData);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details. Please try again later.");
        setLoading(false);
      });
  }, [id]);
  
  useEffect(() => {
    if (movie) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some(fav => fav.id === movie.id));
    }
  }, [movie]);
  
  const toggleFavorite = () => {
    if (!movie) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Movies
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={movie.image}
                alt={movie.movie}
                className="h-auto w-full md:w-80 object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{movie.movie}</h2>
                <button 
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full ${isFavorite 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4 flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Rating: {movie.rating}/10
                  </span>
                  {movie.year && (
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {movie.year}
                    </span>
                  )}
                  {movie.genre && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {movie.genre}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 mb-6">
                  {movie.description || "No description available for this movie."}
                </p>
                
                {movie.director && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Director</h3>
                    <p className="text-gray-600">{movie.director}</p>
                  </div>
                )}
                
                {movie.cast && movie.cast.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cast</h3>
                    <p className="text-gray-600">{movie.cast.join(', ')}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href={movie.imdb_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                >
                  <span>View on TMDB</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
                <button 
                  onClick={toggleFavorite}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center transition-colors ${
                    isFavorite
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;



