export const serverMiddleware = (server) => {
  server.useMiddleware(server.serverModuleRouter);
};
