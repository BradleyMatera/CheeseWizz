import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import DisplayResults from "./components/DisplayResults";
import ContactForm from "./components/ContactForm";
import API from "./API/apis";
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSearch = async (collection, searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.fetchAllContacts(searchTerm);
      setResults(response.contacts);
    } catch (err) {
      console.error("Search failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsCreating(false); // Not creating, just editing
  };

  const handleSave = async (updatedContact) => {
    setLoading(true);
    try {
      if (isCreating) {
        await API.createContact(updatedContact);
      } else if (editingContact && editingContact._id) {
        await API.updateContact(editingContact._id, updatedContact);
      }
      setEditingContact(null);
      setIsCreating(false);
      handleSearch("contacts", ""); // Reload the contact list after save
    } catch (err) {
      console.error("Save failed:", err.message);
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingContact(null);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingContact(null);
    setIsCreating(true);
  };

const handleDelete = async (id) => {
  if (!id) {
    console.error("Invalid contact ID");
    return;
  }

  setLoading(true);
  try {
    await API.deleteContact(id); // Make sure the ID is passed correctly
    handleSearch("contacts", ""); // Reload the contact list after delete
  } catch (err) {
    console.error("Delete failed:", err.message);
    setError("Delete failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container">
      <h1 className="title">Contact Management</h1>

      {!editingContact && !isCreating ? (
        <>
          <SearchBar onSubmit={handleSearch} isLoading={loading} />
          <button onClick={handleCreate} className="create-button">Create Contact</button> {/* Create Contact button */}
          {loading && <p>Loading results...</p>}
          {error && <p className="error-message">Error: {error}</p>}
          <DisplayResults results={results} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      ) : (
        <ContactForm contact={editingContact} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default App;