export class RenderError extends Error {
  constructor(message) {
    super(message);

    this.name = 'RenderError';
  }
}
