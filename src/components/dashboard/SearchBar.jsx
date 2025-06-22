import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for artists, songs, albums..."
          className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent placeholder-gray-500 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-800 text-white p-2 rounded-full hover:bg-amber-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
