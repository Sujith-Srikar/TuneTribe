import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const primaryArtist = album.artists?.primary?.length > 0 ? album.artists.primary[0] : null;

  const getImage = (imageArray) => {
    if (!imageArray || imageArray.length === 0) return null;
    const highQuality = imageArray.find(img => img.quality === "500x500" || img.quality === "high");
    return highQuality ? highQuality.url : imageArray[0].url;
  };

  const imageUrl = getImage(album.image);
  const artistName = primaryArtist ? primaryArtist.name : "Various Artists";

  return (
    <div 
      className="w-44 h-[15rem] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/album/${album.id}`)}
    >
      <div className="relative w-full h-44 rounded-md overflow-hidden">
        <img 
          src={imageUrl} 
          alt={album.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-white mt-2 text-sm font-semibold truncate">{album.name}</h3>
      <p className="text-gray-400 text-xs truncate">{artistName}</p>
      <span className="text-xs text-gray-500 capitalize">{album.language || ""}</span>
    </div>
  );
}

export default AlbumCard;
