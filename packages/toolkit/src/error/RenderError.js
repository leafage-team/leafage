export class RenderError extends Error {
  constructor(err) {
    const { message, stack } = typeof err === 'string' ? ({ message: err }) : (err || {});

    super(message);

    this.name = 'RenderError';
    this.stack = stack || [];
  }
}
