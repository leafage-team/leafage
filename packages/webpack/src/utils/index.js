import { logger, utils } from '@leafage/toolkit';

export const createWebpackContext = (context) => ({
  context,
  options: context.options,

  config: {},

  name: 'base',
  isDev: context.options.dev,
  isServer: false,
  isClient: false,
});
export const applyPresets = (webpackContext, presets) => {
  const presetList = utils.toArray(presets).map((preset) => preset?.(webpackContext));

  return Promise.all(presetList);
};
export const fileName = (webpackContext, key) => {
  let name = webpackContext.options.builder.filenames?.[key];

  if (typeof name === 'function') {
    name = name(webpackContext);
  }
  if (typeof fileName === 'string' && webpackContext.options.dev) {
    const hash = /\[(chunkhash|contenthash|hash)(?::\d+)?\]/.exec(name);
    if (hash) {
      logger.warn(`Notice: Please do not use ${hash[1]} in dev mode to prevent memory leak`);
    }
  }

  return name;
};
