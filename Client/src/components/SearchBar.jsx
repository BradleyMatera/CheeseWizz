import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");
  const [collection, setCollection] = useState("cheese");

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  const handleCollectionChange = (event) => {
    setCollection(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (term.trim() === "") {
      onSubmit(collection, "getAll");
    } else {
      onSubmit(collection, term);
    }
  };

  return (
    <div className="search-bar">
      <h3>Search Bar</h3>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={term}
          onChange={handleSearchChange}
          placeholder="Enter a search term"
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;