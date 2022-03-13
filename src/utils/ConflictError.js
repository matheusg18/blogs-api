class ConflictError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ConflictError';
    this.code = 409 || code;
  }
}

module.exports = ConflictError;
