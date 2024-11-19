import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        songId: {
            type: String
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);



export const FavoriteSong = mongoose.model(
    "FavoriteSong",
    favoriteSongSchema,
    "favorite-songs" // Explicit collection name
);
