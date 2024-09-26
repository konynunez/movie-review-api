"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Dotenv
require("dotenv").config();
// Import Express
const express_1 = __importDefault(require("express"));
// Import CORS
const cors = require("cors");
// Import Axios
const axios = require("axios");
// create an express application
const app = (0, express_1.default)();
// define a port
const PORT = process.env.PORT;
// Define our Middleware
// Use CORS Middleware
const corsOptions = {
    origin: process.env.BEVERAGE_CLIENT,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// Use JSON middleware to parse request bodies
app.use(express_1.default.json());
// Define our Routes
// Home Route
app.get("/", (request, response, next) => {
    response.json({ message: "welcome to our server" });
});
// Error Handling
// Generic Error Handling
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({
        error: "Something broke!",
        errorStack: error.stack,
        errorMessage: error.message,
    });
});
// 404 Resource not found Error Handling
app.use((request, response, next) => {
    response.status(404).json({
        error: "Resource not found. Are you sure you're looking in the right place?",
    });
});
// make the server listen on our port
const server = app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
// export our app for testing
module.exports = app;
