import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        // Ensure that MONGO_URL is defined
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Successfully connected to the database!");
    } catch (error) {
        console.error("❌ Failed to connect to the database.");
        console.error(error instanceof Error ? error.message : error);
        process.exit(1); // Exit the process if the database connection fails
    }
};
