import path from 'pathe';
import { imports } from '@leafage/toolkit';

export const aliasPreset = (ctx) => {
  ctx.config.resolve.alias = {
    '@': path.join(ctx.options.dir.root, ctx.options.dir.src),
  };

  const packagePath = imports.resolveModule('./package.json', {
    url: ctx.options.dir.root,
  });
  // eslint-disable-next-line import/no-dynamic-require
  const { dependencies } = require(packagePath);

  Object.keys(dependencies).forEach((key) => {
    ctx.config.resolve.alias[key] = path.join(ctx.options.dir.root, 'node_modules', key);
  });
};
