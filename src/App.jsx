import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import MoviesDetails from "./components/MoviesDetails";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect( async () => {
      let response = await axios.get("https://dummyapi.online/api/movies")
      setMovies(response.data)
      console.log(response.data);
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MoviesList movies={movies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        />
        <Route path="/movie/:id" element={<MoviesDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
