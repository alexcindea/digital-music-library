import { Request, Response } from "express";
import { Artist } from "../models/artist";

// Get all artists
export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
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
