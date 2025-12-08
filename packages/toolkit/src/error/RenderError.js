export class RenderError extends Error {
  constructor(err) {
    super(err?.message ?? err);

    this.name = 'RenderError';
  }
}
