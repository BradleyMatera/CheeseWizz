import React from "react";

const DisplayResults = ({ results, onEdit, onDelete }) => {
  if (!results || results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div className="results-container">
      <ul>
        {results.map((contact) => (
          <li key={contact.id} className="result-item"> {/* Ensure that contact._id is unique */}
            <div>
              <p>{contact.fname} {contact.lname} - {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <p>Birthday: {new Date(contact.birthday).toLocaleDateString()}</p>
            </div>
            <button onClick={() => onEdit(contact)}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayResults;