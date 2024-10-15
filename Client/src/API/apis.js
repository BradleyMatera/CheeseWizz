import axiosInstance from "../utils/axiosInstance";

const API = {
  // Fetch all contacts
  fetchAllContacts: async (searchTerm) => {
    try {
      const response = await axiosInstance.get(`/v1/contacts`, {
        params: { search: searchTerm || "", page: 1, limit: 10, sort: "lname", direction: "asc" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      throw error;
    }
  },

  // Create a new contact
  createContact: async (contactData) => {
    try {
      const response = await axiosInstance.post(`/v1/contacts`, contactData);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error.message);
      throw error;
    }
  },

  // Update an existing contact
  updateContact: async (contactId, updatedData) => {
    try {
      const response = await axiosInstance.put(`/v1/contacts/${contactId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error.message);
      throw error;
    }
  },

  // Delete a contact
  deleteContact: async (contactId) => {
    try {
      const response = await axiosInstance.delete(`/v1/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error.message);
      throw error;
    }
  }
};

export default API;