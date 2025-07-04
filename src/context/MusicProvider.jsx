import { createContext, useState, useContext, useEffect } from "react";

export const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [music, setMusic] = useState(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("last-played")) {
      setMusic(localStorage.getItem("last-played"));
    }
  }, []);

  return (
    <MusicContext.Provider
      value={{
        music,
        setMusic,
        current,
        setCurrent,
        duration,
        setDuration,
        playing,
        setPlaying,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
