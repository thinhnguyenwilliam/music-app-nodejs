import { Request, Response } from "express";
import { SongService } from "../../services/client/SongService"; // Import SongService
import { HttpError } from "../../utils/HttpError"; // Optional: Custom error handling class

export class SongController {
    // View Song for a specific topic by slug
    static async viewSong(req: Request, res: Response): Promise<void> {
        try {
            const { slugTopic } = req.params;
            const { songs, topicTitle } = await SongService.getSongsByTopic(slugTopic);

            // Return the songs and topic as a JSON response
            res.status(200).json({
                topicTitle: topicTitle,
                songs: songs
            });
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Failed to fetch songs" });
            }
        }
    }

    static async detail(req: Request, res: Response): Promise<void> {
        const { slugSong } = req.params; // Get the slugSong from the route parameters

        try {
            // Call the service layer to fetch song, singer, and topic details
            const { song, singer, topic } = await SongService.getSongDetails(slugSong);

            // Send the response as JSON
            res.status(200).json({
                pageTitle: "Chi tiết bài hát",
                song,
                singer,
                topic
            });
        } catch (error) {
            // If an error occurs, send a JSON error response
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }

    // Controller for updating likes
    static async likePatch(req: Request, res: Response): Promise<void> {
        try {
            const { id, status } = req.body;

            // Call the service method
            const result = await SongService.updateLikeStatus(id, status);

            res.status(200).json({
                code: "success",
                like: result.like,
            });
        } catch (error) {
            const statusCode = error instanceof HttpError ? error.statusCode : 500;
            const message = error instanceof HttpError ? error.message : "An error occurred";

            res.status(statusCode).json({
                code: "error",
                message,
            });
        }
    }

    // Toggle favorite status for a song
    static async favoritePatch(req: Request, res: Response): Promise<void> {
        const { id: songId } = req.body;

        try {
            // Get the user ID from the authenticated session
            const userId = "123";//cho bừa

            // Call the service to toggle favorite status
            const { action } = await SongService.toggleFavorite(userId, songId);

            // Send response based on the action performed
            if (action === "added") {
                res.status(200).json({ message: "Song added to favorites" });
            } else if (action === "removed") {
                res.status(200).json({ message: "Song removed from favorites" });
            }
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                console.error("Unexpected error in favoritePatch:", error);
                res.status(500).json({ message: "An unexpected error occurred" });
            }
        }
    }

}
