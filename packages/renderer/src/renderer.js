import { utils } from '@leafage/toolkit';
import { createContext } from './common/utils';
import { loadResourcesPreset } from './presets/loadResources';
import { renderPreset } from './presets/render';

export const createRenderer = (context) => {
  const ctx = createContext(context);

  context.callHook('renderer:create');

  return context.runWithContext(() => utils.applyPresets(ctx, [loadResourcesPreset, renderPreset]));
};
