import { basePreset } from './base';
import { assetsPreset } from './assets';
import { stylePreset } from './style';
import { applyPresets } from '../utils';

export const client = (webpackContext) => {
  webpackContext.name = 'client';
  webpackContext.isClient = true;

  return applyPresets(webpackContext, [
    basePreset,
    assetsPreset,
    stylePreset,
  ]);
};
