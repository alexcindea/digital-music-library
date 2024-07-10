import { Request, Response } from "express";
import { Artist } from "../models/artist";
import { getAlbumInfo, getArtistInfo } from "../services/spotifyService";

// Get all artists
export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    console.log("Checking logs");

    // Fetch artist images from Spotify
    const artistsWithImages = await Promise.all(
      artists.map(async (artist) => {
        const spotifyInfo = await getArtistInfo(artist.name);
        //console.log("Spotify Info", spotifyInfo);
        return {
          ...artist.toObject(),
          image:
            spotifyInfo.images.length > 0 ? spotifyInfo.images[0].url : null, // Use the first image
          followers: spotifyInfo.followers,
          popularity: spotifyInfo.popularity,
        };
      })
    );

    res.json(artistsWithImages);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new artist
export const createArtist = async (req: Request, res: Response) => {
  const artist = new Artist(req.body);
  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Update an artist
export const updateArtist = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(artist);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an artist
export const deleteArtist = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json({ message: "Artist deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get albums for an artist
export const getAlbumsForArtist = async (req: Request, res: Response) => {
  try {
    // Find the artist in MongoDB by name
    const artist = await Artist.findOne({ name: req.params.name }).select(
      "albums"
    );
    if (!artist) {
      console.log("Artist not found:", req.params.name);
      return res.status(404).json({ message: "Artist not found" });
    }

    // Log the found artist
    console.log("Artist found:", artist);

    // Fetch Spotify artist info to get the Spotify artist ID
    const spotifyArtistInfo = await getArtistInfo(req.params.name);

    // Fetch albums info from Spotify using the Spotify artist ID
    const spotifyAlbums = await getAlbumInfo(spotifyArtistInfo.id);

    // Combine MongoDB albums with Spotify images
    const albumsWithImages = artist.albums.map((album) => {
      const spotifyAlbum = spotifyAlbums.find(
        (sa: any) => sa.name.toLowerCase() === album.title.toLowerCase()
      );
      return {
        ...album.toObject(),
        image: spotifyAlbum ? spotifyAlbum.images[0].url : null, // Use the first image
      };
    });

    // Send the image album data in the response
    res.json(albumsWithImages);
  } catch (err: any) {
    // Log the error
    console.error("Error fetching albums for artist:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get songs for an album
export const getSongsForAlbum = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findOne({ title: req.params.artistTitle });
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const album = artist.albums.find(
      (album) => album.title === req.params.albumTitle
    );
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album.songs);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// Get artist details with Spotify info
export const getArtistDetails = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const spotifyInfo = await getArtistInfo(artist.name);
    const artistWithImages = {
      ...artist.toObject(),
      image: spotifyInfo.images.length > 0 ? spotifyInfo.images[0].url : null, // Use the first image
      bio: spotifyInfo.genres.join(", "), // Use genres as bio for now
    };

    res.json(artistWithImages);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
