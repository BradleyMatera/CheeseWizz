import { useState } from "react";
import SearchBar from "./components/SearchBar";
import API from "./API";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (collection, searchTerm) => {
    console.log("Search Button Clicked!", collection, searchTerm);

    try {
      let response;
// add thease if else statements to handle all the different collections
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


      setResults(response); // Update the state with the search results
      console.log("Response received:", response);
    } catch (error) {
      console.error("There was an error with the CheeseWizz API:", error.message);
      alert("An error occurred while fetching the data. Please try again later.");
    }
  };

  return (
    <>
      <h1>Cheese Finder</h1>
      <SearchBar onSubmit={handleSearch} />
      <div className="results">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item._id} className="item">
              <h3>{item.name}</h3>
              <p>{item.description || item.flavor || item.country || "No additional info"}</p>
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