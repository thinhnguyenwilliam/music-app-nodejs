import { Song } from "../../models/Song";
import { Singer } from "../../models/Singer";
import { Topic } from "../../models/Topic";
import { FavoriteSong } from "../../models/FavoriteSong ";
import { HttpError } from "../../utils/HttpError"; // Optional: Custom error handling class
import unidecode from "unidecode";

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
    static async getSongDetails(slugSong: string, userId: string) {
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

            // Check if the song is in the user's favorites
            const existSongInFavorite = await FavoriteSong.findOne({
                songId: song.id,
                userId: userId // Use userId passed from controller
            });

            // Add the favorite status to the song object
            song["favorite"] = existSongInFavorite ? true : false;

            return { song, singer, topic }; // Return combined data
        } catch (error) {
            throw error; // Rethrow any error for handling in the controller
        }
    }


    // Update song likes or dislikes
    static async updateLikeStatus(id: string, status: "like" | "dislike") {
        try {
            // Find the song
            const song = await Song.findOne({
                _id: id,
                deleted: false,
                status: "active",
            });

            if (!song) {
                throw new HttpError("Song not found or inactive", 404);
            }

            // Update the like count
            let updatedLikeCount = song.like;
            if (status === "like") {
                updatedLikeCount++;
            } else if (status === "dislike") {
                updatedLikeCount--;
            }

            // Save the updated like count
            await Song.updateOne(
                { _id: id, deleted: false, status: "active" },
                { like: updatedLikeCount }
            );

            return {
                success: true,
                like: updatedLikeCount,
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError("Failed to update likes", 500, error);
        }
    }


    // Toggle favorite status for a song
    static async toggleFavorite(userId: string, songId: string) {
        try {
            // Check if the song exists and is active
            const song = await Song.findOne({ _id: songId, deleted: false, status: "active" });
            if (!song) {
                throw new HttpError("Song not found or inactive", 404);
            }

            // Check if the song is already favorited by the user
            const existingFavorite = await FavoriteSong.findOne({ userId, songId });

            if (existingFavorite) {
                // Remove the song from favorites
                await FavoriteSong.deleteOne({ userId, songId });
                return { action: "removed" }; // Indicate removal
            } else {
                // Add the song to favorites
                const favorite = new FavoriteSong({ userId, songId });
                await favorite.save();
                return { action: "added" }; // Indicate addition
            }
        } catch (error) {
            throw new HttpError("Failed to toggle favorite status", 500, error);
        }
    }


    // Method to get favorite songs for a user
    static async getFavoriteSongs(userId: string) {
        try {
            // Fetch favorite songs based on the userId
            const favoriteSongs = await FavoriteSong.find({
                userId: userId // Ensure you're filtering by user if needed
            });


            const songDetails = [];

            // Loop through the favorite songs and gather song and singer info
            for (const favorite of favoriteSongs) {
                const infoSong = await Song.findOne({ _id: favorite.songId });
                if (!infoSong) continue;

                const infoSinger = await Singer.findOne({ _id: infoSong.singerId });

                songDetails.push({
                    songId: infoSong._id,
                    title: infoSong.title,
                    avatar: infoSong.avatar,
                    singerFullName: infoSinger ? infoSinger.fullName : "",
                    slug: infoSong.slug
                });
            }

            //console.log(songDetails);
            return songDetails;
        } catch (error) {
            throw new Error("Error fetching favorite songs");
        }
    }


    // Search songs by keyword (slug)
    static async searchSongs(keyword: string) {
        try {
            // Prepare the keyword for regex search
            let keywordRegex = keyword.trim().replace(/\s+/g, "-");
            keywordRegex = unidecode(keywordRegex);
            const slugRegex = new RegExp(keywordRegex, "i");

            // Find songs matching the keyword
            const songs = await Song.find({
                slug: slugRegex,
                deleted: false, // Assuming you're only interested in non-deleted songs
                status: "active" // Filter only active songs
            }).select("slug avatar title like singerId");

            // Add singerFullName to each song
            for (const song of songs) {
                const infoSinger = await Singer.findOne({ _id: song.singerId, deleted: false });
                song["singerFullName"] = infoSinger ? infoSinger.fullName : "";
            }

            return songs; // Return the songs with added singerFullName
        } catch (error) {
            throw new HttpError("Error searching for songs", 500, error); // Handle errors appropriately
        }
    }
}
