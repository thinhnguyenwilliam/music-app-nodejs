import express from "express";
import { SongController } from "../../controllers/client/SongController";

const router = express.Router();


// Song Routes
//Router động cho xuống cuối cùng
router.patch("/like", SongController.likePatch);
router.patch("/favorite", SongController.favoritePatch);
router.get("/favorite", SongController.favorite);
router.get("/detail/:slugSong", SongController.detail);
router.get("/:slugTopic", SongController.viewSong);

export default router;
