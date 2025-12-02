export class ServerError extends Error {
  constructor({ message, statusCode, headers, stack } = {}) {
    super(message);

    this.name = 'ServerError';
    this.statusCode = statusCode || 500;
    this.headers = headers || {};
    this.stack = stack || [];
  }
}
