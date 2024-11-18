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


}
