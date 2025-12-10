import { context } from '@leafage/toolkit';
import { createServer } from '@leafage/server';

export const serverPreset = (ctx) => {
  const { server } = createServer(ctx);
  server.use((req, res, next) => context.runWithContext(ctx, () => next()));

  ctx.server = server;
};
