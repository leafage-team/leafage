import { rspack } from '@rspack/core';
import { logger } from '@leafage/toolkit';
import { client } from './config/client';
import { server } from './config/server';

export const getBundleConfig = (context) => context.runWithContext(() => [client, server].map((preset) => preset(context)));
export const bundle = (context) => {
  const configs = getBundleConfig(context);

  return new Promise((resolve, reject) => {
    context.runWithContext(() => {
      rspack(configs, (err, stats) => {
        if (err) {
          logger.error(`Compilation error process: \n${err}`);

          reject(err);

          return;
        }
        if (stats.hasErrors()) {
          const statsErr = new Error(stats.toString('normal'));

          logger.error(`Compilation error process: \n${statsErr.message}`);

          reject(statsErr);

          return;
        }

        resolve();
      });
    });
  });
};
