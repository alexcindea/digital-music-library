import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.LASTFM_API_KEY;
const baseUrl = "http://ws.audioscrobbler.com/2.0/";

console.log("apiKey", apiKey);

const lastfmApi = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
    format: "json",
  },
});

export const getArtistInfo = async (artistName: string) => {
  const response = await lastfmApi.get("", {
    params: {
      method: "artist.getinfo",
      artist: artistName,
    },
  });

  console.log("Response:", response.data);

  return response.data.artist;
};

export const getAlbumInfo = async (artistName: string, albumTitle: string) => {
  const response = await lastfmApi.get("", {
    params: {
      method: "album.getinfo",
      artist: artistName,
      album: albumTitle,
    },
  });

  return response.data.album;
};

// export const getAlbumInfo = async (artistName: string, albumTitle: string) => {
//   const response = await axios.get(
//     `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artistName}&album=${albumTitle}`
//   );
//   return response.data;
// };
