import express from "express";
import topicRoutes from "./TopicRoutes";  // Import topic routes
import songRoutes from "./SongRoutes"; // Import the new song routes


const router = express.Router();

// Mount the topicRoutes under /topics
router.use("/topics", topicRoutes);
router.use("/songs", songRoutes);  // Add the new song routes

export default router;
