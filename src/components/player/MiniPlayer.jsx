import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPause, IoPlay, IoChevronForwardSharp, IoChevronBackSharp  } from "react-icons/io5";
import { X, ExternalLink } from "lucide-react";

export default function MiniPlayer({ song, onClose, onNext, onPrev }) {
  const navigate = useNavigate();

  const [playing, setPlaying] = useState(true);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    if (audioRef.current && playing) {
      audioRef.current.play();
    }
  }, [song]);

  if (!song) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-lg flex items-center gap-3 p-3 w-[320px] border dark:border-zinc-700">
      <audio ref={audioRef} src={song.audioUrl} autoPlay />

      <img src={song.imageUrl} alt="cover" className="w-14 h-14 rounded-lg object-cover" />

      <div className="flex-1 overflow-hidden">
        <button onClick={() => navigate(`/player/${song.id}`)} className="hover:underline text-sm font-semibold truncate">{song.title}</button>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>

      <button onClick={onPrev} className="text-xl" title="Previous">
        <IoChevronBackSharp />
      </button>
      <button onClick={togglePlayPause} className="text-xl">
        {playing ? <IoPause /> : <IoPlay />}
      </button>
      <button onClick={onNext} className="text-xl" title="Next">
        <IoChevronForwardSharp />
      </button>

      <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
