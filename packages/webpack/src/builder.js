import { applyPresets, createWebpackContext } from './utils';
import { client } from './presets/client';
import { server } from './presets/server';

export const getWebpackConfig = (context) => {
  const configList = [client, server].map((preset) => {
    const webpackContext = createWebpackContext(context);

    return applyPresets(webpackContext, preset).then(() => webpackContext.config);
  });

  return Promise.all(configList);
};
