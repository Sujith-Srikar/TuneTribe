import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoPause,
  IoPlay,
  IoChevronForwardSharp,
  IoChevronBackSharp,
} from "react-icons/io5";
import { X, ExternalLink } from "lucide-react";
import { useMusic } from "../../context/MusicProvider";
import { getSongById } from "../../utils/api";
import { Slider } from "../ui/slider";

export default function MiniPlayer() {
  const navigate = useNavigate();
  const {
    music,
    setMusic,
    current,
    setCurrent,
    duration,
    setDuration,
    playing,
    setPlaying,
  } = useMusic();
  const [audioUrl, setAudioUrl] = useState("");
  const [song, setSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSeek = (value) => {
    if (audioRef.current && value.length > 0) {
      const seekTime = value[0];
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      setCurrent(seekTime);
    }
  };

  useEffect(() => {
    if (!music) return;

    async function getSongDetails() {
      try {
        const res = await getSongById(music);

        if (res && res.data && res.data.length > 0) {
          const songData = res.data[0];
          setSong(songData);

          const audioUrl =
            songData.downloadUrl?.[4]?.url ||
            songData.downloadUrl?.[3]?.url ||
            songData.downloadUrl?.[2]?.url ||
            songData.downloadUrl?.[1]?.url ||
            songData.downloadUrl?.[0]?.url;

          if (audioUrl) {
            setAudioUrl(audioUrl);
            localStorage.setItem("last-played", music);
          } else {
            console.log("No audio URL found for song");
          }
        } else {
          console.log("Song data not found");
        }
      } catch (error) {
        console.log("Error playing song in miniplayer: ", error);
      }
    }

    getSongDetails();
  }, [music]);

  const togglePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const onClose = () => {
    setMusic(null);
    setSong(null);
    setAudioUrl("");
    localStorage.removeItem("last-played");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      try {
        setCurrentTime(audio.currentTime);
        setCurrent(audio.currentTime);
      } catch (e) {
        setPlaying(false);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Sync with global current time
    if (current && !isNaN(parseFloat(current))) {
      audio.currentTime = parseFloat(current);
    }

    // Auto-play when song is loaded
    if (audioUrl && playing) {
      audio.play().catch((error) => {
        console.log("Auto-play failed:", error);
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      }
    };
  }, [song, audioUrl, playing, current, setCurrent, setDuration, setPlaying]);

  if (!song) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border dark:border-zinc-700 w-[380px] overflow-hidden">
      <audio ref={audioRef} src={audioUrl} autoPlay />

      {/* Progress Bar */}
      <div className="w-full">
        {!duration ? (
          <div className="h-1 w-full bg-neutral-800" />
        ) : (
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.01}
            onValueChange={handleSeek}
            className="w-full group"
            trackClassName="h-1 transition-[height] group-hover:h-2 rounded-none"
            thumbClassName="hidden group-hover:block"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex items-center gap-3 p-3">
        <img
          src={song.image?.[2]?.url}
          alt="cover"
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div className="flex-1 overflow-hidden">
          <button
            onClick={() => navigate(`/player/${song.id}`)}
            className="hover:underline text-sm font-semibold truncate block w-full text-left"
          >
            {song?.name}
          </button>
          <p className="text-xs text-muted-foreground truncate">
            {song.artists?.primary?.[0]?.name || "Unknown Artist"}
          </p>

          {/* Time Display */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>•</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="text-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Previous"
          >
            <IoChevronBackSharp />
          </button>
          <button onClick={togglePlayPause} className="text-lg mx-1">
            {playing ? <IoPause /> : <IoPlay />}
          </button>
          <button
            className="text-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Next"
          >
            <IoChevronForwardSharp />
          </button>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
