import { Request, Response } from "express";
import { Artist } from "../models/artist";
import { getArtistInfo } from "../services/spotifyService";

// Get all artists
export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();

    // Fetch artist images from Spotify
    const artistsWithImages = await Promise.all(
      artists.map(async (artist) => {
        const spotifyInfo = await getArtistInfo(artist.name);
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
    const artist = await Artist.findOne({ name: req.params.name }).select(
      "albums"
    );
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist.albums);
  } catch (err: any) {
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
