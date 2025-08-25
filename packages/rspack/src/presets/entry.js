import path from 'pathe';
import globBase from 'glob-base';
import glob from 'fast-glob';
import { getInnerComponentPath, searchFileByName } from '../common/utils';

const CLIENT_ENTRY_LOADER = 'client-entry-loader';

export const entryPreset = (ctx) => {
  const pattern = path.join(ctx.options.dir.root, ctx.options.dir.src, ctx.options.dir.page, ctx.options.dir.pattern);
  const { base } = globBase(pattern);

  const entry = {};
  if (ctx.isServer) {
    const serverEntryPath = searchFileByName('server', ctx.options);
    if (serverEntryPath) {
      entry.server = serverEntryPath;
    }

    entry.Document = getInnerComponentPath('Document', ctx.options);
    entry.App = getInnerComponentPath('App', ctx.options);
  }
  // page entry
  glob.sync(pattern).forEach((file) => {
    const name = path.relative(base, file).replace(path.extname(file), '');

    entry[name] = file;
  });
  const errorEntryPath = searchFileByName('Error', ctx.options);
  if (errorEntryPath) {
    entry.Error = errorEntryPath;
  }
  Object.keys(entry).forEach((name) => {
    const file = entry[name];
    if (ctx.isServer) {
      ctx.config.entry[name] = file;
      return;
    }

    const clientEntry = `${CLIENT_ENTRY_LOADER}!${file}`;
    if (ctx.isDev) {
      ctx.config.entry[name] = [require.resolve('webpack-hot-middleware/client'), clientEntry];
      return;
    }

    ctx.config.entry[name] = clientEntry;
  });

  if (ctx.isClient) {
    ctx.config.resolveLoader.alias[CLIENT_ENTRY_LOADER] = require.resolve('../loader/client-entry-loader');
  }
};
