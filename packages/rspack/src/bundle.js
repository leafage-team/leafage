import { rspack } from '@rspack/core';
import { logger } from '@leafage/toolkit';
import { client } from './config/client';
import { server } from './config/server';

export const getBundleConfig = (context) => context.runWithContext(() => [client, server].map((preset) => preset(context)));
export const bundle = async (context) => {
  const configs = getBundleConfig(context);

  context.runWithContext(() => {
    rspack(configs, (err, stats) => {
      if (err) {
        logger.error(`Compilation error process: \n${err}`);
        return;
      }
      if (stats.hasErrors()) {
        logger.error(`Compilation error process: \n${stats.toString('normal')}`);
      }
    });
  });
};
