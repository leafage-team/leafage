import { runWithContext } from '@leafage/toolkit';
import { createServer } from '@leafage/server';

export const serverPreset = (ctx) => {
  const { server } = createServer(ctx);
  server.use((req, res, next) => runWithContext(ctx, () => next()));

  ctx.server = server;
};
