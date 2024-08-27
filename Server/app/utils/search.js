// Function to build search criteria for MongoDB queries

// This function takes a search term and a specific field to search within. 
// If no search term is provided, it returns an empty object, meaning no search criteria.

// The search term is converted into a regular expression (regex) with the 'i' flag to 
// make the search case-insensitive. The resulting regex is then used to search 
// within the specified field.

const buildSearchCriteria = (searchTerm, searchField) => {
    if (!searchTerm) {
        return {}; // No search term provided, return empty criteria
    }
    const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regex from the search term
    return { [searchField]: regex }; // Return the search criteria object
};

module.exports = buildSearchCriteria;