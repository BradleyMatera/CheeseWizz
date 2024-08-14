const express = require('express'); // Importing express module

const app = express(); // Creating an express app instance

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Route to handle addition of cheese slices
app.get('/cheese/add', (req, res) => {
    const { a, b } = req.query;
    const result = parseInt(a) + parseInt(b);
    console.log(`Adding ${a} slices of cheese to ${b} slices of cheese gives you ${result} slices of cheese!`);
    res.json({ result: `Adding ${a} slices of cheese to ${b} slices of cheese gives you ${result} slices of cheese!` });
});

// Route to handle subtraction of cheese slices
app.get('/cheese/subtract', (req, res) => {
    const { a, b } = req.query;
    const result = parseInt(a) - parseInt(b);
    console.log(`Subtracting ${b} slices of cheese from ${a} slices of cheese gives you ${result} slices of cheese!`);
    res.json({ result: `Subtracting ${b} slices of cheese from ${a} slices of cheese gives you ${result} slices of cheese!` });
});

// Route to handle multiplication of cheese blocks
app.get('/cheese/multiply', (req, res) => {
    const { a, b } = req.query;
    const result = parseInt(a) * parseInt(b);
    console.log(`Multiplying ${a} blocks of cheese by ${b} slices per block gives you ${result} slices of cheese!`);
    res.json({ result: `Multiplying ${a} blocks of cheese by ${b} slices per block gives you ${result} slices of cheese!` });
});

// Route to handle division of cheese blocks among people
app.get('/cheese/divide', (req, res) => {
    const { a, b } = req.query;
    if (b == 0) {
        return res.status(400).json({ error: "Cannot divide cheese by zero." });
    }
    const result = parseInt(a) / parseInt(b);
    console.log(`Dividing ${a} blocks of cheese by ${b} people gives you ${result} blocks per person!`);
    res.json({ result: `Dividing ${a} blocks of cheese by ${b} people gives you ${result} blocks per person!` });
});

// Route to handle square root of cheese slices
app.get('/cheese/sqrt', (req, res) => {
    const { a } = req.query;
    const result = Math.sqrt(parseInt(a));
    console.log(`The square root of ${a} slices of cheese is ${result} slices!`);
    res.json({ result: `The square root of ${a} slices of cheese is ${result} slices!` });
});

// Route to handle finding the maximum of two cheese blocks
app.get('/cheese/max', (req, res) => {
    const { a, b } = req.query;
    const result = Math.max(parseInt(a), parseInt(b));
    console.log(`Comparing ${a} and ${b} blocks of cheese, the maximum is ${result} blocks!`);
    res.json({ result: `Comparing ${a} and ${b} blocks of cheese, the maximum is ${result} blocks!` });
});

module.exports = app; // Exporting the express app for use in server.js