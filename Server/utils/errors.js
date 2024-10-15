// utils/errors.js
class ApiTestingError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiTestingError";
  }
}

class InvalidContactSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidContactSchemaError";
  }
}

class PaginationResultCountError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaginationResultCountError";
  }
}

module.exports = {
  ApiTestingError,
  InvalidContactSchemaError,
  PaginationResultCountError,
};