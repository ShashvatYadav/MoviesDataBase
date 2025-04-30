import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About MovieDB</h1>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                MovieDB is dedicated to providing a comprehensive database of movies from around the world. 
                Our goal is to create a platform where movie enthusiasts can discover, explore, and keep 
                track of their favorite films. We strive to offer a user-friendly experience with up-to-date 
                information on the latest releases as well as timeless classics.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Features</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Browse a vast collection of movies from different genres and eras</li>
                <li>Search for specific movies by title, actor, or director</li>
                <li>Save your favorite movies for quick access</li>
                <li>Get detailed information about each movie, including ratings and synopsis</li>
                <li>Responsive design for a seamless experience across all devices</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Data Sources</h2>
              <p className="text-gray-600 leading-relaxed">
                Our movie data is sourced from various reliable APIs and databases in the film industry.
                We update our database regularly to ensure that our users have access to the most accurate
                and current information available.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                Have suggestions or feedback? We'd love to hear from you! Contact our team at:
              </p>
              <div className="mt-2 text-blue-500 font-medium">support@moviedb.example.com</div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-gray-500 text-sm text-center">
              MovieDB is a demo project created for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 