import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-5 flex items-center justify-center">
      <input
        type="text"
        placeholder="🔍 Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-lg p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;

