import { Router } from "express";
import {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from "../controllers/artistController";

const router = Router();

router.get("/", getAllArtists);
router.post("/", createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

export default router;
