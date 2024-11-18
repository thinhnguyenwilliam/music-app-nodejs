import mongoose, { Schema } from "mongoose";
import { ITopic } from "../interfaces/ITopic";

const topicSchema = new Schema<ITopic>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"], // Example statuses
            default: "active",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

export const Topic = mongoose.model<ITopic>("Topic", topicSchema, "topics");
