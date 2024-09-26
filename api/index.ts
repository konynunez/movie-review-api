// Import Dotenv
import dotenv from "dotenv";
dotenv.config();

// Import Express
import express, { Request, Response, NextFunction } from "express";

// Import CORS and Axios
import cors from "cors";
import axios from "axios";

// Create an express application
const app = express();

// Define a port with a fallback option
const PORT = process.env.PORT || 3000;

// Debugging: Ensure environment variables are loaded
// console.log("PORT:", process.env.PORT);
// console.log("MOVIE-API_CLIENT:", process.env.MOVIE_API_CLIENT);

// Define our Middleware
// Use CORS Middleware
const corsOptions = {
  origin: process.env.MOVIE_API_CLIENT || "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Use JSON middleware to parse request bodies
app.use(express.json());

// Define our Routes
// Home Route
app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: "Welcome to our server!" });
});

// Error Handling
// Generic Error Handling
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).json({
      error: "Something broke!",
      errorStack: error.stack,
      errorMessage: error.message,
    });
  }
);

// 404 Resource not found Error Handling
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({
    error:
      "Resource not found. Are you sure you're looking in the right place?",
  });
});

// Make the server listen on our port
const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

// Export our app for testing
module.exports = app;
