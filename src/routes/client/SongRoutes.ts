import express from "express";
import { SongController } from "../../controllers/client/SongController";

const router = express.Router();

// Song Routes
router.get("/:slugTopic", SongController.viewSong);
router.get("/detail/:slugSong", SongController.detail);


export default router;
