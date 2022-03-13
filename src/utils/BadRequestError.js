class BadRequestError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'BadRequestError';
    this.code = 400 || code;
  }
}

module.exports = BadRequestError;
