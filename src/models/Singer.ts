import mongoose, { Schema } from "mongoose";
import { ISinger } from "../interfaces/ISinger";


// Singer Schema definition
const singerSchema = new Schema<ISinger>(
    {
        fullName: { type: String, required: true },
        avatar: { type: String },
        status: { type: String, default: "active" },
        slug: { type: String, required: true, unique: true },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

// Create the model with the type interface
export const Singer = mongoose.model<ISinger>("Singer", singerSchema, "singers");