import { join, normalize } from 'pathe';
import glob from 'fast-glob';
import { logger } from '@leafage/toolkit';

export const createContext = (context) => ({
  context,
  options: context.options,

  config: {},

  name: 'base',
  isDev: context.options.dev,
  isServer: false,
  isClient: false,
});
export const getFileName = (ctx, key) => {
  let fileName = ctx.options.builder.filenames?.[key];

  if (typeof fileName === 'function') {
    fileName = fileName(ctx);
  }
  if (typeof fileName === 'string' && ctx.isDev) {
    const hash = /\[(chunkhash|contenthash|hash)(?::\d+)?\]/.exec(fileName);
    if (hash) {
      logger.warn(`Notice: Please do not use ${hash[1]} in dev mode to prevent memory leak`);
    }
  }

  return fileName;
};
export const searchFiles = (pattern, options) => glob.sync(normalize(pattern), options);
export const searchFileByName = (name, options) => {
  const [filePath] = searchFiles(join(options.dir.root, options.dir.src, `${name}.{js,jsx}`));

  return filePath;
};
export const getInnerComponentPath = (name, options) => {
  const filePath = searchFileByName(name, options);

  return filePath || normalize(require.resolve(`@leafage/component/dist/${name}`));
};
export const getBuildStatsError = (stats) => {
  const error = new Error('Builder error');
  error.stack = stats.toString('normal');
  return error;
};
