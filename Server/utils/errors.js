// customErrors.js

// Invalid contact schema error
class InvalidContactSchemaError extends Error {
  constructor(message = 'The contact schema is invalid.') {
    super(message);
    this.name = 'InvalidContactSchemaError';
    this.statusCode = 400; // Bad Request
  }
}

// Contact not found error
class ContactNotFoundError extends Error {
  constructor(message = 'The requested contact was not found.') {
    super(message);
    this.name = 'ContactNotFoundError';
    this.statusCode = 404; // Not Found
  }
}

// Duplicate contact resource error
class DuplicateContactResourceError extends Error {
  constructor(message = 'A contact with the same details already exists.') {
    super(message);
    this.name = 'DuplicateContactResourceError';
    this.statusCode = 409; // Conflict
  }
}

// Pagination result count error
class PaginationResultCountError extends Error {
  constructor(message = 'Pagination result count is invalid.') {
    super(message);
    this.name = "PaginationResultCountError";
    this.statusCode = 500; // Internal Server Error
  }
}

module.exports = {
  InvalidContactSchemaError,
  ContactNotFoundError,
  DuplicateContactResourceError,
  PaginationResultCountError,
};