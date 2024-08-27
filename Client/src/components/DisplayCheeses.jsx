import React from "react";

/**
 * Renders an array of items.
 * @param {Array} arr - The array to be rendered.
 * @returns {JSX.Element} - A list of rendered items.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * @see https://reactjs.org/docs/lists-and-keys.html
 */
const renderArray = (arr) => (
  <ul>
    {arr.map((item, index) => (
      <li key={index}>
        {typeof item === "object" && item !== null 
          ? renderObject(item) 
          : item !== null 
            ? item 
            : "No Data" // Safeguard for null or undefined array elements.
        }
      </li>
    ))}
  </ul>
);

/**
 * Renders an object as a list of key-value pairs.
 * @param {Object} obj - The object to be rendered.
 * @returns {JSX.Element} - A list of the object's key-value pairs.
 * 
 * This function safeguards against null, undefined, or non-object values to prevent runtime errors.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * @see https://reactjs.org/docs/jsx-in-depth.html#javascript-expressions-as-children
 */
const renderObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return "No Data"; // Return "No Data" if the input is not a valid object.
  }
  return (
    <ul>
      {Object.entries(obj).map(([key, value], index) => (
        <li key={index}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value)
            ? renderArray(value) // Recursively render arrays.
            : typeof value === "object" && value !== null
              ? renderObject(value) // Recursively render nested objects.
              : value !== null
                ? value 
                : "No Data" // Handle cases where values are null or undefined.
          }
        </li>
      ))}
    </ul>
  );
};

/**
 * Displays a list of cheeses or other collection items.
 * @param {Array} results - The results array to display, containing objects from the database.
 * @returns {JSX.Element} - A structured list of items with their properties.
 * 
 * The DisplayCheeses component is designed to handle complex and nested data structures,
 * ensuring that any valid data type (array, object, string, etc.) is displayed correctly.
 * 
 * @see https://reactjs.org/docs/components-and-props.html
 * @see https://reactjs.org/docs/conditional-rendering.html
 */
function DisplayCheeses({ results }) {
  return (
    <div className="results">
      {results.length > 0 ? (
        results.map((item) => (
          <div key={item._id} className="item">
            <h3>{item.name || "Unnamed Item"}</h3>
            {/* Dynamically render the object's properties */}
            {renderObject(item)}
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default DisplayCheeses;