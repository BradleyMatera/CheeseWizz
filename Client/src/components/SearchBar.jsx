import { useState } from "react";

function SearchBar({ onSubmit }) {
  // State to hold the current search term
  const [term, setTerm] = useState("");

  // State to hold the currently selected collection (default is "cheese")
  const [collection, setCollection] = useState("cheese");

  // Handler for changes in the search input field
  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  // Handler for changes in the collection dropdown
  const handleCollectionChange = (event) => {
    setCollection(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (term.trim() === "") {
      // If no search term is entered, fetch all items from the selected collection
      onSubmit(collection, "getAll");
    } else {
      // If a search term is entered, pass it along with the selected collection
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

        {/* Input field for entering the search term */}
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={term}
          onChange={handleSearchChange}
          placeholder="Enter a search term"
        />

        {/* Submit button for the search form */}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;