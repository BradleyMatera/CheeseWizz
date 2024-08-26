import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");  // State to store the search term

  const handleSearchChange = (event) => {
    setTerm(event.target.value);  // Update the search term state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);  // Pass the search term to the onSubmit function
  };

  return (
    <>
      <h3>Search Bar</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={term}
          onChange={handleSearchChange}
        />
        {term.length < 3 && <p>Search term must be at least 3 characters long</p>}
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default SearchBar;