import { Song } from "../../models/Song";
import { Singer } from "../../models/Singer";
import { Topic } from "../../models/Topic";
import { HttpError } from "../../utils/HttpError"; // Optional: Custom error handling class


export class SongService {
    // Get songs by topic slug
    static async getSongsByTopic(slugTopic: string) {
        try {
            // Find topic by slug
            const topic = await Topic.findOne({
                slug: slugTopic,
                deleted: false,
                status: "active"
            });

            if (!topic) {
                throw new HttpError("Topic not found or inactive", 404);
            }

            // Find songs related to the topic
            const songs = await Song.find({
                topicId: topic.id,
                deleted: false,
                status: "active"
            }).select("id title avatar singerId like slug");

            // Add singerFullName to each song
            for (let song of songs) {
                const infoSinger = await Singer.findOne({
                    _id: song.singerId,
                    deleted: false
                });

                song.singerFullName = infoSinger ? infoSinger.fullName : "";
            }

            return {
                songs,  // Each song will have the 'singerFullName' field
                topicTitle: topic.title
            };
        } catch (error) {
            throw new HttpError("Failed to fetch songs or topic", 500, error);
        }
    }

    // Method to get song details along with singer and topic information
    static async getSongDetails(slugSong: string) {
        try {
            // Fetch the song based on slug and other filters
            const song = await Song.findOne({ slug: slugSong, deleted: false, status: "active" });
            if (!song) throw new HttpError("Song not found", 404);

            // Fetch the singer details
            const singer = await Singer.findOne({ _id: song.singerId }).select("fullName");
            if (!singer) throw new HttpError("Singer not found", 404);

            // Fetch the topic details
            const topic = await Topic.findOne({ _id: song.topicId }).select("title");
            if (!topic) throw new HttpError("Topic not found", 404);

            return { song, singer, topic }; // Return combined data
        } catch (error) {
            throw error; // Rethrow any error for handling in the controller
        }
    }
}
