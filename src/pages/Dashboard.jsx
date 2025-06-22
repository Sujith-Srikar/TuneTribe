import { useState } from "react";
import { getSongsByQuery } from "../utils/api";
import { Navbar, Footer, SearchBar, TrackList } from "../components";

function Dashboard() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("songs"); // Default tab: songs, can be: songs, albums, artists

  const handleSearch = async (keyword) => {
    try {
      setLoading(true);
      const response = await getSongsByQuery(keyword);
      setSearchResults(response);
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get the appropriate results based on active tab
  const getResults = () => {
    if (!searchResults || !searchResults.data) return [];

    switch (activeTab) {
      case "songs":
        return searchResults.data.songs?.results || [];
      case "albums":
        return searchResults.data.albums?.results || [];
      case "artists":
        return searchResults.data.artists?.results || [];
      default:
        return [];
    }
  };

  const results = getResults();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar/>
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              Find Your Perfect Sound
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>

          {!hasSearched && (
            <div className="relative overflow-hidden rounded-2xl mb-10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Discover New Music
                </h2>
                <p className="text-gray-300 max-w-lg">
                  Search for your favorite artists, songs, or albums and start
                  exploring.
                </p>
              </div>
            </div>
          )}

          {hasSearched && (
            <div className="mb-6">
              <div className="flex space-x-4 border-b border-neutral-800 mb-8">
                <button
                  className={`py-2 px-4 font-medium text-sm ${
                    activeTab === "songs"
                      ? "text-amber-800 border-b-2 border-amber-800"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("songs")}
                >
                  Songs
                </button>
                <button
                  className={`py-2 px-4 font-medium text-sm ${
                    activeTab === "albums"
                      ? "text-amber-800 border-b-2 border-amber-800"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("albums")}
                >
                  Albums
                </button>
                <button
                  className={`py-2 px-4 font-medium text-sm ${
                    activeTab === "artists"
                      ? "text-amber-800 border-b-2 border-amber-800"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("artists")}
                >
                  Artists
                </button>
              </div>
            </div>
          )}

          <TrackList tracks={results} loading={loading} type={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
