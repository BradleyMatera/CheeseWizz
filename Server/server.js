require("dotenv").config();
const app = require("./app");
const connectDB = require("./app/db/config");

connectDB(); // Establish DB connection

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => console.log(`Cheese Database Server running on port ${PORT}`)); // Start server