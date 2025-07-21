import { watchConfig } from 'c12';
import mergeFn from 'lodash/merge';
import common from './module/common';
import builder from './module/builder';
import server from './module/server';

export const loadConfig = async (opt = {}) => {
  const { config } = await watchConfig({
    name: 'leafage',
    dotenv: true,
    defaults: mergeFn(
      {},
      {
        ...common,
        builder,
        server,
      },
    ),
    onUpdate: ({ newConfig }) => (opt.onUpdate?.(newConfig.config)),
  });

  return config;
};
