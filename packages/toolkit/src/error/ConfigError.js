export class ConfigError extends Error {
  constructor(err) {
    super(err?.message ?? err);

    this.name = 'ConfigError';
  }
}
