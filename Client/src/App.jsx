import { useState } from "react";
import SearchBar from "./components/SearchBar";
import DisplayCheeses from "./components/DisplayCheeses"; // Import the new DisplayCheeses component
import API from "./API";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (collection, searchTerm) => {
    console.log("Search Button Clicked!", collection, searchTerm);

    try {
      let response;

      // Check if the collection is "cheese"
      if (collection === "cheese") {
        // If true, call the API method to fetch all cheeses based on the searchTerm
        response = await API.fetchAllCheeses(searchTerm);

      // Check if the collection is "origin"
      } else if (collection === "origin") {
        // If true, call the API method to fetch all origins based on the searchTerm
        response = await API.fetchAllOrigins(searchTerm);

      // Check if the collection is "taste"
      } else if (collection === "taste") {
        // If true, call the API method to fetch all tastes based on the searchTerm
        response = await API.fetchAllTastes(searchTerm);

      // Check if the collection is "relatedCheese"
      } else if (collection === "relatedCheese") {
        // If true, call the API method to fetch all related cheeses based on the searchTerm
        response = await API.fetchAllRelatedCheeses(searchTerm);
      }

      setResults(response); // Update the useState with the search results
      console.log("Response received:", response);
    } catch (error) {
      console.error("There was an error with the CheeseWizz API:", error.message);
      alert("An error occurred while fetching the data. Please try again later.");
    }
  };

  return (
    <>
      {/* Main title for the Cheese Finder application */}
      <h1>Cheese Finder</h1>

      {/* Search bar component for handling user input */}
      <SearchBar onSubmit={handleSearch} />

      {/* DisplayCheeses component for displaying search results */}

      <h3> Results </h3>
      <DisplayCheeses results={results} />
    </>
  );
}

export default App;