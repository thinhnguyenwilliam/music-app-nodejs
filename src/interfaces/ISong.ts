import { Document } from "mongoose";

// Interface for Song document
export interface ISong extends Document {
    title: string;
    avatar: string;
    description: string;
    singerId: string;
    topicId: string;
    like: number;
    lyrics: string;
    audio: string;
    status: string;
    slug: string;
    deleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    singerFullName?: string;
    favorite?: boolean;
}