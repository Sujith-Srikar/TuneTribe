import { useState } from "react";
import MiniPlayer from "../player/MiniPlayer";

function SongCard({ song }) {
  const [activeSong, setActiveSong] = useState(null);

  const id = song.id;
  const primaryArtist = song.artists?.primary?.[0];
  const imageUrl =
    song.image?.find((img) => img.quality === "500x500" || img.quality === "high")?.url ||
    song.image?.[0]?.url;
  const artistName = primaryArtist ? primaryArtist.name : "Unknown Artist";

  return (
    <>
    <div
      className="w-44 h-[14.5rem] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
      onClick={() => {
          setActiveSong(song);                
      }}
    >
      <div className="relative w-full h-44 rounded-md overflow-hidden">
        <img
          src={imageUrl}
          alt={song.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <button className="bg-black/60 hover:bg-black/80 transition-colors rounded-full p-2 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.5 5.5a.75.75 0 011.165-.638l6 4a.75.75 0 010 1.276l-6 4A.75.75 0 016.5 13.5v-8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-white mt-2 text-sm font-semibold truncate">{song.name}</h3>
      <p className="text-gray-400 text-xs truncate">{artistName}</p>
    </div>
    {activeSong && (
        <MiniPlayer
          song={{
            id: activeSong.id,
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
      )}
    </> 
  );
}

export default SongCard;

