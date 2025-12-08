export class BundleError extends Error {
  constructor(err) {
    super(err?.message ?? err);

    this.name = 'BundleError';
  }
}
