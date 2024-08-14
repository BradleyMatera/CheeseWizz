const express = require('express'); // Importing express module
const morgan = require('morgan'); // Importing morgan module
const routeHandler = require('./routes/routeHandler'); // Importing routeHandler module
const app = express(); // Creating an express app instance

app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {res.status(200).json
    ({message: "API service is up and running", success: true});
});
app.use("/api/v1", routeHandler);

module.exports = app;