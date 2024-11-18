import { Document } from "mongoose";

export interface ITopic extends Document {
    title: string;
    avatar?: string;
    description?: string;
    status?: string;
    slug: string;
    deleted: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
