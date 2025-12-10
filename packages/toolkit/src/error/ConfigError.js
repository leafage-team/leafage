export class ConfigError extends Error {
  constructor(err) {
    const { message, stack } = typeof err === 'string' ? ({ message: err }) : (err || {});

    super(message);

    this.name = 'ConfigError';
    this.stack = stack || [];
  }
}
