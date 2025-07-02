import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AlbumCard, SongCard, Navbar } from "../components";
import MiniPlayer from "../components/player/MiniPlayer";
import { getAlbumById } from "../utils/api";

function AlbumPage() {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSong, setActiveSong] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        const response = await getAlbumById(id);
        if (response.success && response.data) {
          setAlbumData(response.data);
        } else {
          setError("Failed to load album data");
        }
      } catch (err) {
        console.error("Error fetching album:", err);
        setError("An error occurred while fetching the album");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlbumData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-800"></div>
        </div>
      </div>
    );
  }

  if (error || !albumData) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-gray-400 mt-2">
            {error || "Failed to load album"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 md:px-32 py-8">
        {/* Album Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-64 flex-shrink-0">
            {albumData.image && (
              <img
                src={
                  albumData.image.find((img) => img.quality === "500x500")
                    ?.url || albumData.image[0]?.url
                }
                alt={albumData.name}
                className="w-full aspect-square rounded-lg shadow-lg object-cover"
              />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">{albumData.name}</h1>
            <p className="text-gray-400 mb-4">
              {albumData.description ||
                `${albumData.year} · ${
                  albumData.language?.charAt(0).toUpperCase() +
                  albumData.language?.slice(1)
                } Album`}
            </p>

            <div className="flex items-center mb-2">
              <span className="text-gray-400">by </span>
              <span className="text-white ml-1 font-medium">
                {albumData.artists?.primary
                  ?.map((artist) => artist.name)
                  .join(", ") || "Various Artists"}
              </span>
            </div>

            <div className="flex items-center mt-4 bg-zinc-900 self-start px-4 py-2 rounded-full">
              <span className="text-sm">
                {albumData.songCount || albumData.songs?.length || 0} songs
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Songs</h2>
          {/* Added the group class to the parent div for hover effect */}
          <div className="group">
            <div
              className="overflow-x-auto custom-scroll pb-4"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-4" style={{ minWidth: "max-content" }}>
                {albumData.songs?.map((song) => (
                  <div key={song.id} className="w-48 flex-shrink-0">
                    <SongCard key={song.id} song={song} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {activeSong && (
        <MiniPlayer
          song={{
            title: activeSong.name,
            artist: activeSong.artists?.primary?.[0]?.name || "Unknown",
            imageUrl: activeSong.image?.[2]?.url || "",
            audioUrl:
              activeSong.downloadUrl?.[2]?.url ||
              activeSong.downloadUrl?.[1]?.url ||
              activeSong.downloadUrl?.[0]?.url ||
              "",
          }}
          onClose={() => setActiveSong(null)}
        />
      )} */}
    </div>
  );
}

export default AlbumPage;