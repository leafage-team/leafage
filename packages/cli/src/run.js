import { build, dev, start } from 'leafage';
import { loadConfig } from '@leafage/toolkit';

const commands = {
  start: (config) => start(config),
  dev: (config) => dev(config),
  build: (config) => build(config),
};

const getCommand = (name) => {
  if (!commands[name]) return;

  return commands[name];
};

export const run = async (_argv) => {
// Read from process.argv
  const argv = _argv ? Array.from(_argv) : process.argv.slice(2);
  // Check for internal command
  let cmd = getCommand(argv[0]);

  if (!cmd) {
    argv.unshift('dev');
    cmd = getCommand('dev');
  }
  // Check for dev
  const isDev = argv[0] === 'dev';
  // Apply default NODE_ENV if not provided
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = isDev ? 'development' : 'production';
  }
  // Load config
  const config = await loadConfig({
    cwd: process.cwd(),
    overrides: {
      dev: isDev,
    },
  });

  // Run command
  await cmd(config);
};
