import path from 'pathe';
import globBase from 'glob-base';
import glob from 'fast-glob';
import { getInnerComponentPath } from '@/common/utils';

const CLIENT_ENTRY_LOADER = 'client-entry-loader';

export const entryPreset = (ctx) => {
  const pattern = path.join(ctx.options.dir.root, ctx.options.dir.src, ctx.options.dir.page, ctx.options.dir.pattern);
  const { base } = globBase(pattern);

  glob.sync(pattern).forEach((file) => {
    const name = path.relative(base, file).replace(path.extname(file), '');
    if (ctx.isServer) {
      ctx.config.entry[name] = file;
      return;
    }

    const entryPath = `${CLIENT_ENTRY_LOADER}!${file}`;
    if (ctx.isDev) {
      ctx.config.entry[name] = [require.resolve('webpack-hot-middleware/client'), entryPath];
      return;
    }

    ctx.config.entry[name] = entryPath;
  });

  ctx.config.entry.Error = getInnerComponentPath('Error', ctx.options);
  if (ctx.isServer) {
    ctx.config.entry.Document = getInnerComponentPath('Document', ctx.options);
    ctx.config.entry.App = getInnerComponentPath('App', ctx.options);
  }
  if (ctx.isClient) {
    ctx.config.resolveLoader.alias[CLIENT_ENTRY_LOADER] = require.resolve('../loader/client-entry-loader');
  }
};
