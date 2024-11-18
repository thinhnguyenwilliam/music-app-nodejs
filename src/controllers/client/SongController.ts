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
}
