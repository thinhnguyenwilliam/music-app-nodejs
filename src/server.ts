import app from "./app";
import dotenv from "dotenv";
import { connect } from "./config/database";

dotenv.config();

const port: number = parseInt(process.env.PORT || "9999", 10);

// Validate port number
if (isNaN(port) || port < 0 || port > 65535) {
  throw new Error("Invalid port number");
}

(async () => {
  try {
    await connect(); // Connect to the database

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1); // Exit the process on failure
  }
})();
