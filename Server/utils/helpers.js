// utils/helpers.js
// Sorting logic
const sortContacts = (contacts, sortBy = 'lname', direction = 'asc') => {
  return contacts.sort((a, b) => {
    const fieldA = a[sortBy]?.toLowerCase() || ''; // Ensure field exists and convert to lowercase
    const fieldB = b[sortBy]?.toLowerCase() || '';
    if (direction === 'asc') {
      return fieldA.localeCompare(fieldB);
    } else {
      return fieldB.localeCompare(fieldA);
    }
  });
};

// Pagination logic
const paginateContacts = (contacts, page = 1, limit = 10) => {
  const totalContacts = contacts.length;
  const totalPages = Math.ceil(totalContacts / limit);
  const currentPage = Math.min(Math.max(page, 1), totalPages); // Ensure page is within bounds
  const start = (currentPage - 1) * limit;
  const end = currentPage * limit;

  const paginatedContacts = contacts.slice(start, end);

  return { paginatedContacts, totalPages, currentPage, totalContacts };
};

module.exports = { paginateContacts, sortContacts };