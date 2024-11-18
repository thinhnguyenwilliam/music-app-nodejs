import { Document } from "mongoose";

// Interface for Singer document
export interface ISinger extends Document {
    fullName: string;
    avatar: string;
    status: string;
    slug: string;
    deleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}