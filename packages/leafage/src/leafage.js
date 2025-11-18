import { mergeConfig, useContext, utils } from '@leafage/toolkit';
import { hooksPreset } from './presets/hooks';
import { rendererPreset } from './presets/renderer';
import { serverPreset } from './presets/server';
import { bundlePreset } from './presets/bundle';

export const useConfig = () => {
  const ctx = useContext();

  return ctx?.config;
};
export const useServer = () => {
  const ctx = useContext();

  return ctx?.server;
};
export const useFindResource = () => {
  const ctx = useContext();

  return ctx?.findResource;
};
export const useRender = () => {
  const ctx = useContext();

  return ctx?.render;
};
export const createLeafage = async ({ config = {} } = {}) => {
  const leafageConfig = await mergeConfig(config);
  const context = {
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
    context,
    [
      hooksPreset,
      rendererPreset,
      serverPreset,
      bundlePreset,
    ],
  );
};
