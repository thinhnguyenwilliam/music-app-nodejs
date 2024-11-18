// src/server.ts
import app from "./app";
//import connectDB from "./config/database";
import dotenv from "dotenv";


dotenv.config(); // Load environment variables
//connectDB(); // Initialize MongoDB connection


const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
