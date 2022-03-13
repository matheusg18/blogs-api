class NotFoundError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'NotFoundError';
    this.code = 404 || code;
  }
}

module.exports = NotFoundError;
