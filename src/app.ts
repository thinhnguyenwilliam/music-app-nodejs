import express, { Express, Request, Response } from "express";
import clientRoutes from "./routes/client";  // Importing the client route

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/client", clientRoutes);  // Routes now prefixed with "/api"

// Error handling
app.use((req: Request, res: Response) => {
    res.status(404).send("Route not found");
});

export default app;
