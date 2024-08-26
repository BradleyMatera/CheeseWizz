import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import API from "./API";
import "./App.css";

function App() {
  const [cheeses, setCheeses] = useState([]);  // State to store the search results

  const handleSearch = async (searchTerm) => {
    console.log("Search Button Clicked!", searchTerm);

    try {
      const response = await API.fetchAllCheeses(searchTerm);  // Fetch cheeses based on search term
      setCheeses(response);  // Update the state with the search results
      console.log("From CheeseWizz API", response);
    } catch (error) {
      console.error("There was an error with the CheeseWizz API:", error.message);
      alert("An error occurred while fetching the cheeses. Please try again later.");
    }
  };

  return (
    <>
      <h1>Cheese Finder</h1>
      <SearchBar onSubmit={handleSearch} />
      <div className="results">
        {cheeses.length > 0 ? (
          cheeses.map((cheese) => (
            <div key={cheese._id} className="cheese-item">  {/* Changed from cheese.id to cheese._id */}
              <h3>{cheese.name}</h3>
              <p>{cheese.description}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}

export default App;