import path from 'pathe';
import globBase from 'glob-base';
import glob from 'fast-glob';
import { getInnerComponentPath } from '@/common/utils';

export const entryPreset = (ctx) => {
  const resolve = (...dir) => path.join(ctx.options.dir.root, ...dir);
  const entryFn = (id) => {
    if (ctx.isClient) return `${id}?useClientEntryLoader`;

    return id;
  };

  const pattern = resolve(ctx.options.dir.src, ctx.options.dir.page, ctx.options.dir.pattern);
  const { base } = globBase(pattern);
  glob.sync(pattern).forEach((file) => {
    const name = path.relative(base, file).replace(path.extname(file), '');

    ctx.config.entry[name] = entryFn(file);
  });

  if (ctx.isServer) {
    ctx.config.entry.Document = getInnerComponentPath('Document', ctx.options);
    ctx.config.entry.App = getInnerComponentPath('App', ctx.options);
    ctx.config.entry.Error = getInnerComponentPath('Error', ctx.options);
  }
};
