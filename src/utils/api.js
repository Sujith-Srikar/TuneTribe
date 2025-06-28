import axios from "axios";

const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

export const getSongsByQuery = async (query) => {
  try {
    const response = await axios.get(`${apiUrl}/search/songs`, {
      params: { query },
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching songs:", err);
    throw err;
  }
};

export const getSongsByAlbum = async (query) => {
  try {
    const response = await axios.get(`${apiUrl}/search/albums`, {
      params: { query },
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching songs:", err);
    throw err;
  }
};

export const getSongById = async (ids) => {
  try {
    const response = await axios.get(`${apiUrl}/songs`, {
      params: { ids },
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching song details:", err);
    throw err;
  }
};

export const getAlbumById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/albums`, {
      params: { id },
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching song details:", err);
    throw err;
  }
};

export const getSongSuggestions = async (ids) => {
  try {
      const response = await axios.get(`${apiUrl}/songs/${ids}/suggestions`);
      return response.data;
  } catch (err) {
      console.log("Error fetching Song Suggestions:" , err);
      throw err;
  }
}