// src/app.ts
import express from "express";
// import { routesClient } from "./routes/client/indexRoute";
// import cors from 'cors';

const app = express();

// Define CORS options
// const corsOptions: cors.CorsOptions = {
//     origin: ['http://localhost:3000', 'https://example.com'], // Allowed origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: true, // Allow cookies to be sent with cross-origin requests
// };

// // Enable CORS middleware
// app.use(cors(corsOptions));


// Middleware setup
app.use(express.json()); // to parse JSON body
app.use(express.urlencoded({ extended: true }));

// Client Routes
// routesClient(app);

export default app;
