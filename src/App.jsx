import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import MoviesDetails from "./components/MoviesDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";
import About from "./components/About";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // Using a more reliable free movies API
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716");
        // Transform the data to match our expected format
        const transformedData = response.data.results.map(movie => ({
          id: movie.id,
          movie: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          year: movie.release_date ? movie.release_date.substring(0, 4) : "",
          imdb_url: `https://www.themoviedb.org/movie/${movie.id}`
        }));
        setMovies(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {error ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
                <p className="font-medium">{error}</p>
              </div>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <MoviesList 
                    movies={movies} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    loading={loading}
                  />
                }
              />
              <Route path="/movie/:id" element={<MoviesDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
