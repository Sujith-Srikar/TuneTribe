import { useState, useEffect } from "react";
import { getSongsByQuery, getSongsByAlbum } from "../utils/api";

export function useSearchResults(query) {
  const [songs, setSongs]     = useState([]);
  const [albums, setAlbums]   = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!query) return;

    const extractUniqueArtists = (songs) => {
      const map = {};
      songs.forEach((song) =>
        song.artists?.primary?.forEach((a) => {
          if (!map[a.id]) map[a.id] = a;
        })
      );
      return Object.values(map);
    };

    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [sRes, aRes] = await Promise.all([
          getSongsByQuery(query),
          getSongsByAlbum(query),
        ]);

        if (sRes.success) {
          setSongs(sRes.data.results || []);
          setArtists(extractUniqueArtists(sRes.data.results || []));
        }
        if (aRes.success) {
          setAlbums(aRes.data.results || []);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [query]);

  return { songs, albums, artists, loading, error };
}