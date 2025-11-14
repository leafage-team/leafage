import * as c12 from 'c12';
import { applyDefaults } from 'untyped';
import defaultConfig from './defaultConfig';

export const loadConfig = async ({ cwd, path } = {}) => {
  const { config: loadUserConfig } = await c12.loadConfig({
    cwd,
    configFile: path,
    name: 'leafage',
    dotenv: false,
    omit$Keys: true,
  });

  return loadUserConfig;
};
export const mergeConfig = async (config = {}) => applyDefaults(defaultConfig, config);
