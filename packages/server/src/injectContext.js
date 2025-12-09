class InjectContext {
  constructor(server) {
    this.server = server.server;
    this.config = server.config;
    this.renderer = server.renderer;
  }
}

export { InjectContext };
