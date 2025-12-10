import { config, context, utils } from '@leafage/toolkit';
import { hooksPreset } from './presets/hooks';
import { rendererPreset } from './presets/renderer';
import { serverPreset } from './presets/server';
import { bundlePreset } from './presets/bundle';

export const useConfig = () => {
  const ctx = context.useContext();

  return ctx?.config;
};
export const useServer = () => {
  const ctx = context.useContext();

  return ctx?.server;
};
export const useFindResource = () => {
  const ctx = context.useContext();

  return ctx?.findResource;
};
export const useRender = () => {
  const ctx = context.useContext();

  return ctx?.render;
};
export const createLeafage = async ({ config: configArgs = {} } = {}) => {
  const leafageConfig = await config.mergeConfig(configArgs);
  const ctx = {
    version: process.env.PACKAGE_VERSION,
    config: leafageConfig,
    hook: utils.emptyFn,
    callHook: utils.emptyFn,
    build: utils.emptyFn,
    server: utils.emptyFn,
    findResource: utils.emptyFn,
    render: utils.emptyFn,
  };

  return utils.applyPresets(
    ctx,
    [
      hooksPreset,
      rendererPreset,
      serverPreset,
      bundlePreset,
    ],
  );
};
