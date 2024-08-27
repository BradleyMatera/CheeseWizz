import React from "react";

function DisplayCheeses({ results }) {
  // Check if the results array is empty or undefined
  if (!results || results.length === 0) {
    return <div>No cheeses found.</div>; // Display a message if no results are found
  }

  return (
    <div className="results">
      {results.map((item) => (
        <div key={item._id} className="item">
          <h3>{item.name}</h3>
          <p>{item.description || item.flavor || item.country || "No additional info"}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplayCheeses;