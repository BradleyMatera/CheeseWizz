import React, { useState } from "react";

const ContactForm = ({ contact, onSave, onCancel }) => {
  const [fname, setFname] = useState(contact?.fname || "");
  const [lname, setLname] = useState(contact?.lname || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [birthday, setBirthday] = useState(contact?.birthday || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ fname, lname, email, phone, birthday });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Phone:
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button> {/* Cancel button */}
    </form>
  );
};

export default ContactForm;