import { applyPresets, createContext } from '@/common/utils';
import { basePreset } from '@/presets/base';
import { entryPreset } from '@/presets/entry';
import { outputPreset } from '@/presets/output';
import { scriptPreset } from '@/presets/script';
import { stylePreset } from '@/presets/style';
import { assetPreset } from '@/presets/asset';
import { externalPreset } from '@/presets/external';

export const server = (options = {}) => {
  const ctx = createContext(options);
  ctx.name = 'server';
  ctx.isServer = true;

  applyPresets(ctx, [basePreset, entryPreset, outputPreset, scriptPreset, stylePreset, assetPreset, externalPreset]);

  return ctx.config;
};
