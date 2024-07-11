import { Router } from "express";
import {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getAlbumsForArtist,
  getSongsForAlbum,
  getArtistDetails,
  deleteAlbum,
  getArtistSuggestions,
  addAlbumToArtist,
} from "../controllers/artistController";

const router = Router();

router.get("/", getAllArtists);
router.post("/", createArtist);
router.put("/:id", updateArtist);
router.delete("/:name", deleteArtist);
router.get("/:name/albums", getAlbumsForArtist);
router.get("/:artistName/albums/:albumTitle/songs", getSongsForAlbum);
router.get("/suggestions", getArtistSuggestions);
router.get("/:id/details", getArtistDetails);
router.route("/:name/albums/:albumTitle").delete(deleteAlbum);
router.post("/:name/albums", addAlbumToArtist);

export default router;
