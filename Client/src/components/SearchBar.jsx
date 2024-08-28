import './styles/SearchBar.scss'; // Import the styles for the SearchBar component
import React, { useState } from "react"; // Import React and the useState hook

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState(""); // State to hold the search term
  const [collection, setCollection] = useState("cheese"); // State to hold the selected collection

  const handleSearchChange = (event) => {
    setTerm(event.target.value); // Update the search term state when the input value changes
  };

  const handleCollectionChange = (event) => {
    setCollection(event.target.value); // Update the collection state when the select value changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (term.trim() === "") {
      onSubmit(collection, "getAll"); // If the search term is empty, submit with "getAll"
    } else {
      onSubmit(collection, term); // Otherwise, submit with the search term
    }
  };

  return (
    <div className="search-bar bg-yellow-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-yellow-900 mb-4">Search Bar</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="collection" className="text-lg font-semibold text-yellow-800 mb-2">
            Collection:
          </label>
          <select
            id="collection"
            name="collection"
            value={collection}
            onChange={handleCollectionChange}
            className="p-2 rounded-lg border border-yellow-300 text-yellow-900 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          >
            <option value="cheese">Cheeses</option>
            <option value="origin">Origins</option>
            <option value="taste">Tastes</option>
            <option value="relatedCheese">Related Cheeses</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="search" className="text-lg font-semibold text-yellow-800 mb-2">
            Search:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={term}
            onChange={handleSearchChange}
            placeholder="Enter a search term"
            className="p-2 rounded-lg border border-yellow-300 text-yellow-900 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white font-bold py-2 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar; // Export the SearchBar component as the default export