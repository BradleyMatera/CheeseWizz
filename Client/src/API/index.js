import axios from 'axios';

const API = {
  // Fetch all cheeses based on the search term provided
  fetchAllCheeses: async (searchTerm) => {
    try {
      // Perform a GET request to the cheeses endpoint with the search term as a query parameter
      const response = await axios.get(`http://localhost:3000/api/v1/cheeses?search=${searchTerm}`);
      // Return the data from the response
      return response.data.data;
    } catch (error) {
      // Log any errors encountered during the fetch operation
      console.error("Error fetching cheeses:", error.message);
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  },

  // Fetch all origins based on the search term provided
  fetchAllOrigins: async (searchTerm) => {
    try {
      // Perform a GET request to the origins endpoint with the search term as a query parameter
      const response = await axios.get(`http://localhost:3000/api/v1/origins?search=${searchTerm}`);
      // Return the data from the response
      return response.data.data;
    } catch (error) {
      // Log any errors encountered during the fetch operation
      console.error("Error fetching origins:", error.message);
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  },

  // Fetch all tastes based on the search term provided
  fetchAllTastes: async (searchTerm) => {
    try {
      // Perform a GET request to the tastes endpoint with the search term as a query parameter
      const response = await axios.get(`http://localhost:3000/api/v1/tastes?search=${searchTerm}`);
      // Return the data from the response
      return response.data.data;
    } catch (error) {
      // Log any errors encountered during the fetch operation
      console.error("Error fetching tastes:", error.message);
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  },

  // Fetch all related cheeses based on the search term provided
  fetchAllRelatedCheeses: async (searchTerm) => {
    try {
      // Perform a GET request to the related cheeses endpoint with the search term as a query parameter
      const response = await axios.get(`http://localhost:3000/api/v1/relatedCheeses?search=${searchTerm}`);
      // Return the data from the response
      return response.data.data;
    } catch (error) {
      // Log any errors encountered during the fetch operation
      console.error("Error fetching related cheeses:", error.message);
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  }
};

export default API;