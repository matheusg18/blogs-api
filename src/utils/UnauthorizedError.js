class UnauthorizedError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 401 || code;
  }
}

module.exports = UnauthorizedError;
