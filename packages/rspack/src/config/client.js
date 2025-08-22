import { utils } from '@leafage/toolkit';
import { createContext } from '../common/utils';
import { basePreset } from '../presets/base';
import { aliasPreset } from '../presets/alias';
import { entryPreset } from '../presets/entry';
import { outputPreset } from '../presets/output';
import { envPreset } from '../presets/env';
import { scriptPreset } from '../presets/script';
import { stylePreset } from '../presets/style';
import { assetPreset } from '../presets/asset';
import { manifestPreset } from '../presets/manifest';

export const client = (options = {}) => {
  const ctx = createContext(options);
  ctx.name = 'client';
  ctx.isClient = true;

  utils.applyPresets(ctx, [basePreset, aliasPreset, entryPreset, outputPreset, envPreset, scriptPreset, stylePreset, assetPreset, manifestPreset]);

  return ctx.config;
};
