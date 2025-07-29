import { basePreset } from './base';
import { assetsPreset } from './assets';
import { stylePreset } from './style';
import { applyPresets } from '../utils';

export const server = (webpackContext) => {
  webpackContext.name = 'server';
  webpackContext.isServer = true;

  return applyPresets(webpackContext, [
    basePreset,
    assetsPreset,
    stylePreset,
  ]);
};
