import mongoose, { Schema } from "mongoose";
import { ISong } from "../interfaces/ISong";

const songSchema = new Schema<ISong>(
    {
        title: { type: String, required: true },
        avatar: { type: String },
        description: { type: String },
        singerId: { type: String, required: true },
        topicId: { type: String, required: true },
        like: { type: Number, default: 0 },
        lyrics: { type: String },
        audio: { type: String },
        status: { type: String, default: "active" },
        slug: { type: String, required: true, unique: true },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: { type: Date, default: null },
        singerFullName: { type: String },
        favorite: { type: Boolean },
    },
    {
        timestamps: true,
    }
);

// Create the model with the type interface
export const Song = mongoose.model<ISong>("Song", songSchema, "songs");
