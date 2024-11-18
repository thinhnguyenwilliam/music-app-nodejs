import express, { Express, Request, Response } from "express";
import topicRoutes from "./routes/TopicRoutes";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/topics", topicRoutes);

// Error handling
app.use((req: Request, res: Response) => {
    res.status(404).send("Route not found");
});

export default app;
