const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // Import the cors package

const app = express();
const routeHandler = require("./routes"); // Import routes

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan("dev")); // Middleware for logging HTTP requests

// Health check route to verify API service status
app.get("/", (req, res) => {
    res.status(200).json({ message: "Local Cheese API service is up and running", success: true });
});

// Mount all routes under the /api/v1 namespace
app.use("/api/v1", routeHandler); 

module.exports = app; // Export app for server