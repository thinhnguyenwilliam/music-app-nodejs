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
}
