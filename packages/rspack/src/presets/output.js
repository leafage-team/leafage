import path from 'pathe';
import { getFileName } from '@/common/utils';

export const outputPreset = (ctx) => {
  const resolve = (...dir) => path.join(ctx.options.dir.root, ...dir);
  const result = {
    publicPath: ctx.options.builder.publicPath,
  };

  if (ctx.isClient) {
    result.path = resolve(ctx.options.dir.dist, ctx.options.dir.client);
    result.filename = getFileName(ctx, 'app');
    result.chunkFilename = getFileName(ctx, 'chunk');
  }
  if (ctx.isServer) {
    result.path = resolve(ctx.options.dir.dist, ctx.options.dir.server);
    result.filename = '[name].js';
    result.chunkFilename = '[name].js';
    result.libraryTarget = 'commonjs2';
  }

  ctx.config.output = result;
};
