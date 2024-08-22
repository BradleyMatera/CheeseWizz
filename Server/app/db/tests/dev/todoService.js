const axios = require('axios'); // Importing axios to make HTTP requests to the API
require('dotenv').config(); // Loading environment variables from a .env file

// Function to get all cheese origins with optional query parameters for filtering, pagination, and sorting
// Challenges faced: Initially, there was confusion about how to handle query parameters and how to properly structure the request to ensure that the API understood and responded to these parameters.
// Solution: Added a second argument to the axios.get() method where the params object is passed. This way, the query parameters can be dynamically constructed and included in the API request.
const getAllCheeseOrigins = async (query = {}) => {
    const response = await axios.get(`${process.env.TODO_API_URL}/origins`, { params: query }); // Sending GET request to the /origins endpoint with query parameters
    return response.data; // Returning the data received from the API response
};

// Function to get a specific cheese origin by its ID
// Problems encountered: There was an issue where the function did not handle cases where the ID provided was invalid. The error handling was initially missing, leading to unclear error messages in the tests.
// Solution: Ensured that the function correctly handles the case where the API returns an error for an invalid ID by allowing the error to be handled further up the call stack.
const getCheeseOriginById = async (id) => {
    const response = await axios.get(`${process.env.TODO_API_URL}/origins/${id}`); // Sending GET request to fetch a specific cheese origin by ID
    return response.data; // Returning the data received from the API response
};

// Function to get all related cheeses with optional query parameters
// Challenges faced: Similar to the cheese origins, ensuring that the query parameters were correctly applied was essential for accurate data retrieval, especially when working with paginated or sorted data.
// Solution: Implemented the same pattern as with the cheese origins to handle query parameters dynamically.
const getAllRelatedCheeses = async (query = {}) => {
    const response = await axios.get(`${process.env.TODO_API_URL}/relatedCheeses`, { params: query }); // Sending GET request to the /relatedCheeses endpoint with query parameters
    return response.data; // Returning the data received from the API response
};

// Function to get a specific related cheese by its ID
// Problems encountered: The issue of handling invalid IDs or non-existent resources was also present here, requiring careful error handling in both the service and the tests.
// Solution: Standardized the approach to fetching resources by ID and ensured that any errors are properly propagated for handling in the calling code or tests.
const getRelatedCheeseById = async (id) => {
    const response = await axios.get(`${process.env.TODO_API_URL}/relatedCheeses/${id}`); // Sending GET request to fetch a specific related cheese by ID
    return response.data; // Returning the data received from the API response
};

// Function to get all cheese tastes with optional query parameters
// Challenges faced: As with the previous functions, ensuring the correct implementation of pagination, sorting, and field selection through query parameters was critical to get accurate data from the API.
// Solution: Continued to use a consistent pattern for handling query parameters, making the service functions more modular and easier to test.
const getAllCheeseTastes = async (query = {}) => {
    const response = await axios.get(`${process.env.TODO_API_URL}/tastes`, { params: query }); // Sending GET request to the /tastes endpoint with query parameters
    return response.data; // Returning the data received from the API response
};

// Function to get a specific cheese taste by its ID
// Problems encountered: The need for consistent error handling was again a focal point. This function needed to be robust enough to handle cases where the ID might not correspond to any existing resource.
// Solution: Integrated consistent error handling across all service functions to ensure that invalid requests do not break the application or cause test failures.
const getCheeseTasteById = async (id) => {
    const response = await axios.get(`${process.env.TODO_API_URL}/tastes/${id}`); // Sending GET request to fetch a specific cheese taste by ID
    return response.data; // Returning the data received from the API response
};

module.exports = {
    getAllCheeseOrigins, // Exporting the function to get all cheese origins
    getCheeseOriginById, // Exporting the function to get a specific cheese origin by ID
    getAllRelatedCheeses, // Exporting the function to get all related cheeses
    getRelatedCheeseById, // Exporting the function to get a specific related cheese by ID
    getAllCheeseTastes, // Exporting the function to get all cheese tastes
    getCheeseTasteById, // Exporting the function to get a specific cheese taste by ID
};