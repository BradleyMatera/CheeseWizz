import React, { useState } from "react";

const SearchBar = ({ onSubmit, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(searchTerm); // Send the searchTerm to the handler
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchTerm">Search Contacts:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter name to search"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SearchBar;