import { useState } from "react";
import ErrorBoundary from "./components/shaders/ErrorBoundary"; // Ensure this path is correct
import StarShader from "./components/shaders/StarShader"; // Import StarShader component
import SearchBar from "./components/SearchBar";
import DisplayCheeses from "./components/DisplayCheeses"; // Import DisplayCheeses component
import API from "./API";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (collection, searchTerm) => {
    console.log("Search Button Clicked!", collection, searchTerm);

    try {
      let response;
      if (collection === "cheese") {
        response = await API.fetchAllCheeses(searchTerm);
      } else if (collection === "origin") {
        response = await API.fetchAllOrigins(searchTerm);
      } else if (collection === "taste") {
        response = await API.fetchAllTastes(searchTerm);
      } else if (collection === "relatedCheese") {
        response = await API.fetchAllRelatedCheeses(searchTerm);
      }
      setResults(response); // Update state with the search results
      console.log("Response received:", response);
    } catch (error) {
      console.error("There was an error with the CheeseWizz API:", error.message);
      alert("An error occurred while fetching the data. Please try again later.");
    }
  };

  return (
    <>
      <StarShader />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-4xl font-extrabold text-yellow-800 text-center my-8">
          Cheese Finder
        </h1>
        <p>App is rendering</p> {/* Add this line */}
        <ErrorBoundary>
          <div className="flex justify-center mb-8">
            <SearchBar onSubmit={handleSearch} />
          </div>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">Results</h3>
            <DisplayCheeses results={results} />
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;