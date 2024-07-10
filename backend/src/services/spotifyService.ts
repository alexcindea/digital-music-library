import axios from "axios";
import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

let accessToken: string | null = null;

const getAccessToken = async () => {
  if (!accessToken) {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    accessToken = response.data.access_token;
  }
  return accessToken;
};

export const getArtistInfo = async (artistName: string) => {
  const token = await getAccessToken();
  const response = await axios.get("https://api.spotify.com/v1/search", {
    params: {
      q: artistName,
      type: "artist",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.artists.items.length === 0) {
    throw new Error("Artist not found");
  }

  return response.data.artists.items[0];
};

export const getAlbumInfo = async (artistId: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data.items.length === 0) {
    throw new Error("Albums not found");
  }

  return response.data.items;
};
