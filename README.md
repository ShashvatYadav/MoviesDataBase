# MovieDB - Movie Database App

A modern, responsive React application for browsing and managing your favorite movies.

## Features

- **Browse Movies**: Explore a vast collection of movies fetched from The Movie Database (TMDB) API
- **Search Functionality**: Easily search for movies by title
- **Sorting Options**: Sort movies by title (A-Z, Z-A) or rating (high-low, low-high)
- **Movie Details**: View comprehensive information about each movie including synopsis, rating, cast, and more
- **Favorites System**: Save and manage your favorite movies with a dedicated favorites page
- **Responsive Design**: Fully responsive UI that works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean and intuitive interface built with React and Tailwind CSS

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation between pages
- **Axios**: For API requests
- **Tailwind CSS**: For styling and responsive design
- **TMDB API**: For movie data
- **LocalStorage**: For saving favorite movies

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/moviedb.git
cd moviedb
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
moviedb/
├── public/              # Public assets
├── src/                 # Source files
│   ├── assets/          # Static assets
│   │   ├── About.jsx    # About page
│   │   ├── Favorites.jsx# Favorites page
│   │   ├── Footer.jsx   # Footer component
│   │   ├── MovieCard.jsx# Movie card component
│   │   ├── MovieDetails.jsx# Movie details page
│   │   ├── MoviesList.jsx# Movies list page
│   │   ├── Navbar.jsx   # Navigation bar component
│   │   └── SearchBar.jsx# Search input component
│   ├── App.css          # App-specific styles
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## API Integration

This project uses The Movie Database (TMDB) API to fetch movie data. The following endpoints are used:

- `/movie/popular` - Get a list of popular movies
- `/movie/{movie_id}` - Get detailed information about a specific movie
- `/movie/{movie_id}/credits` - Get cast and crew information for a movie

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## Future Enhancements

- User authentication
- Movie ratings and reviews
- Advanced filtering options
- Watchlist functionality
- Recommendations based on favorites

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the frontend library
