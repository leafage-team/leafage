import { resolve } from 'path';
import { loadConfig } from '@leafage/toolkit';
import { dev } from 'leafage';

export const applyDevCommand = (cli) => {
  cli.option('--port <port>', 'Set the port number for the server');
  cli.option('--host <host>', 'Set the host that the server listens to');

  cli.action(async (options) => {
    const root = resolve(options.root);
    // Load config
    const config = await loadConfig({
      cwd: root,
      envName: options.envName,
      overrides: {
        dev: true,
        envName: options.envName,
        dir: {
          root,
        },
        server: {
          port: options.port,
          host: options.host,
        },
      },
    });

    // Run command
    await dev(config);
  });
};
