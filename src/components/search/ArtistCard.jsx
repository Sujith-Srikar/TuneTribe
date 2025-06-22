import { useNavigate } from "react-router-dom";

function ArtistCard({ artist }) {
  const navigate = useNavigate();

  const getImage = (imageArray) => {
    if (!imageArray || imageArray.length === 0) return null;
    const highQuality = imageArray.find(img => img.quality === "500x500" || img.quality === "high");
    return highQuality ? highQuality.url : imageArray[0].url;
  };

  const imageUrl = artist.image ? getImage(artist.image) : null;
  const initial = artist.name ? artist.name[0].toUpperCase() : "A";

  return (
    <div
      className="w-24 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/search/${artist.name}`)}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center shadow-md">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-3xl font-bold">{initial}</span>
        )}
      </div>
      <p className="text-white mt-2 text-sm text-center font-medium w-full leading-snug break-words">
        {artist.name}
      </p>
    </div>
  );
}

export default ArtistCard;
