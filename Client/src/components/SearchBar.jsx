import './styles/SearchBar.scss';
import React from "react";
import { useState } from "react";

function SearchBar({ onSubmit }) {
  // State to manage the search term entered by the user
  const [term, setTerm] = useState("");

  // State to manage the currently selected collection for searching
  const [collection, setCollection] = useState("cheese");

  // Handler to update the search term state as the user types
  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  // Handler to update the selected collection state when the user changes the dropdown
  const handleCollectionChange = (event) => {
    setCollection(event.target.value);
  };

  // Handler for form submission to trigger the search
  const handleSubmit = (event) => {
    event.preventDefault();
    if (term.trim() === "") {
      // If the search term is empty, trigger a request to get all items in the selected collection
      onSubmit(collection, "getAll");
    } else {
      // Otherwise, trigger a search request with the specified term and collection
      onSubmit(collection, term);
    }
  };

  return (
<div className="search-bar bg-yellow-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
  <h3 className="text-2xl font-bold text-yellow-900 mb-4">Search Bar</h3>
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Dropdown to select the collection to search within */}
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

    {/* Input field to enter the search term */}
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

    {/* Submit button */}
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

export default SearchBar;