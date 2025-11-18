import { join, normalize } from 'pathe';
import glob from 'fast-glob';
import { BundleError, logger } from '@leafage/toolkit';

export const createContext = (context, name) => ({
  context,
  options: context.config,

  config: {},

  name,
  isDev: context.config.dev,
  isServer: name === 'server',
  isClient: name === 'client',
});
export const getFileName = (ctx, key) => {
  let fileName = ctx.options.output.filename?.[key];

  if (typeof fileName === 'function') {
    fileName = fileName({
      name: ctx.name,
      context: ctx.context,
      config: ctx.context.config,
      isDev: ctx.isDev,
      isClient: ctx.isClient,
      isServer: ctx.isServer,
    });
  }
  if (typeof fileName === 'string' && ctx.isDev) {
    const hash = /\[(chunkhash|contenthash|hash)(?::\d+)?\]/.exec(fileName);
    if (hash) {
      logger.warn(`Notice: Please do not use ${hash[1]} in dev mode to prevent memory leak`);
    }
  }

  return fileName;
};
export const getDataUriLimit = (ctx, key) => ctx.options.output.dataUriLimit?.[key];
export const searchFiles = (pattern, options) => glob.sync(normalize(pattern), options);
export const searchFileByName = (name, options) => {
  const [filePath] = searchFiles(join(options.input.src, `${name}.{js,jsx}`));

  return filePath;
};
export const getInnerComponentPath = (name, options) => {
  const filePath = searchFileByName(name, options);

  return filePath || normalize(require.resolve(`@leafage/component/${name}`));
};
export const getBuildStatsError = (stats) => {
  const error = new BundleError('Builder error');
  error.stack = stats.toString('normal');
  return error;
};
export const getCompiledPath = (packageName) => join(__dirname, '../../compiled', packageName, 'index.js');
