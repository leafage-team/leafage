export class ServerError extends Error {
  constructor(err) {
    const { message, statusCode, headers, stack } = err || {};

    super(message);

    this.name = 'ServerError';
    this.statusCode = statusCode || 500;
    this.headers = headers || {};
    this.stack = stack || [];
  }
}
