const express = require("express");
const morgan = require("morgan");
const app = express();
const routeHandler = require("./routes"); // Import routes

app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging middleware
app.get("/", (req, res) => {
    res.status(200).json({ message: "Local Cheese API service is up and running", success: true });
});
app.use("/api/v1", routeHandler); // Mount routes under /api/v1

module.exports = app; // Export app for server