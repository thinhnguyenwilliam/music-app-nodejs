import express from "express";
import { SongController } from "../../controllers/client/SongController";

const router = express.Router();

// Song Routes
router.get("/:slugTopic", SongController.viewSong);


export default router;
