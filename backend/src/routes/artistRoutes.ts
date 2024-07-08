import { Router } from "express";
import {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getAlbumsForArtist,
  getSongsForAlbum,
} from "../controllers/artistController";

const router = Router();

router.get("/", getAllArtists);
router.post("/", createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);
router.get("/:name/albums", getAlbumsForArtist);
router.get("/:artistName/albums/:albumTitle/songs", getSongsForAlbum);

export default router;
