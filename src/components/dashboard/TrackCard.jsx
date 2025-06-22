import { useState } from "react";
import AudioPlayer from "../player/AudioPlayer";

const TrackCard = ({ item, type = "songs" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Different data structure based on content type
  const renderCard = () => {
    switch (type) {
      case "songs":
        return renderSongCard();
      case "albums":
        return renderAlbumCard();
      case "artists":
        return renderArtistCard();
      default:
        return renderSongCard();
    }
  };

  const getHighestQualityImage = (images) => {
    if (!images || !Array.isArray(images)) return "";
    // Get the highest quality image (usually the last one is the highest quality)
    const highestQuality = images.reduce((prev, current) => {
      return prev?.quality?.includes("500") ? prev : current;
    }, images[0]);

    return highestQuality?.url || "";
  };

  const handlePlay = () => {
    setShowPlayer(true);
  };

  // Render a song card
  const renderSongCard = () => {
    const imageUrl = getHighestQualityImage(item.image);

    return (
      <>
        <div
          className="bg-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={`${item.title} - Cover`}
              className="w-full h-48 object-cover transition-transform duration-700 ease-in-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity duration-300 ${
                isHovered ? "opacity-90" : ""
              }`}
            ></div>
            <button
              className={`absolute bottom-3 right-3 bg-amber-800 hover:bg-amber-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg ${
                isHovered
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-2"
              }`}
              onClick={handlePlay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-white text-lg line-clamp-1">
              {item.title}
            </h3>
            <p className="text-gray-400 mb-2">
              {item.primaryArtists || item.singers || "Unknown Artist"}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
              <span>{item.album || ""}</span>
              <span className="px-2 py-1 bg-neutral-700 rounded-full">
                {item.language || ""}
              </span>
            </div>
          </div>
        </div>

        {showPlayer && (
          <AudioPlayer songId={item.id} onClose={() => setShowPlayer(false)} />
        )}
      </>
    );
  };

  // Render an album card
  const renderAlbumCard = () => {
    const imageUrl = getHighestQualityImage(item.image);

    return (
      <div
        className="bg-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={`${item.title} - Album Cover`}
            className="w-full h-48 object-cover transition-transform duration-700 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 transition-opacity duration-300 ${
              isHovered ? "opacity-90" : ""
            }`}
          ></div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-white text-lg line-clamp-1">
            {item.title}
          </h3>
          <p className="text-gray-400 mb-2">
            {item.artist || "Various Artists"}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
            <span>{item.year || ""}</span>
            <span className="px-2 py-1 bg-neutral-700 rounded-full">
              {item.language || ""}
            </span>
          </div>
        </div>

        <div className="px-4 pb-4">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 text-center bg-neutral-700 hover:bg-neutral-600 rounded text-white text-sm transition-colors"
          >
            View Album
          </a>
        </div>
      </div>
    );
  };

  // Render an artist card
  const renderArtistCard = () => {
    const imageUrl = getHighestQualityImage(item.image);

    return (
      <div className="bg-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl || "https://via.placeholder.com/500?text=Artist"}
            alt={`${item.title}`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="font-bold text-white text-xl">{item.title}</h3>
            <p className="text-gray-300">{item.description || "Artist"}</p>
          </div>
        </div>

        {item.url && (
          <div className="p-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 text-center bg-neutral-700 hover:bg-neutral-600 rounded text-white text-sm transition-colors"
            >
              View Artist
            </a>
          </div>
        )}
      </div>
    );
  };

  return renderCard();
};

export default TrackCard;
