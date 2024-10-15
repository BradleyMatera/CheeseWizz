// utils/formatContact.js
const formatContact = (contact) => {
  return {
    fname: contact.fname.trim(),
    lname: contact.lname.trim(),
    email: contact.email.trim().toLowerCase(),
    phone: contact.phone.trim(),
    birthday: new Date(contact.birthday),
  };
};

module.exports = { formatContact };