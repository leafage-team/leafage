import { applyPresets, createContext } from '@/common/utils';
import { basePreset } from '@/presets/base';
import { entryPreset } from '@/presets/entry';
import { outputPreset } from '@/presets/output';
import { scriptPreset } from '@/presets/script';
import { stylePreset } from '@/presets/style';
import { assetPreset } from '@/presets/asset';
import { manifestPreset } from '@/presets/manifest';

export const client = (options = {}) => {
  const ctx = createContext(options);
  ctx.name = 'client';
  ctx.isClient = true;

  applyPresets(ctx, [basePreset, entryPreset, outputPreset, scriptPreset, stylePreset, assetPreset, manifestPreset]);

  return ctx.config;
};
