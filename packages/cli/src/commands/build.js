import { resolve } from 'path';
import { loadConfig } from '@leafage/toolkit';
import { build } from 'leafage';

export const applyBuildCommand = (cli) => {
  cli.action(async (options) => {
    const root = resolve(options.root);
    // Load config
    const config = await loadConfig({
      cwd: root,
      envName: options.envName,
      overrides: {
        dev: false,
        envName: options.envName,
        dir: {
          root,
        },
      },
    });

    // Run command
    await build(config);
  });
};
