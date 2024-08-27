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
    <div className="search-bar">
      <h3>Search Bar</h3>
      <form onSubmit={handleSubmit}>
        {/* Dropdown to select the collection to search within */}
        <label htmlFor="collection">Collection:</label>
        <select
          id="collection"
          name="collection"
          value={collection}
          onChange={handleCollectionChange}
        >
          <option value="cheese">Cheeses</option>
          <option value="origin">Origins</option>
          <option value="taste">Tastes</option>
          <option value="relatedCheese">Related Cheeses</option>
        </select>

        {/* Input field to enter the search term */}
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={term}
          onChange={handleSearchChange}
          placeholder="Enter a search term"
        />

        {/* Button to submit the search form */}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;