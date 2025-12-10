export class BundleError extends Error {
  constructor(err) {
    const { message, stack } = typeof err === 'string' ? ({ message: err }) : (err || {});

    super(message);

    this.name = 'BundleError';
    this.stack = stack || [];
  }
}
