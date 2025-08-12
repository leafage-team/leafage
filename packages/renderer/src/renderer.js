import { utils } from '@leafage/toolkit';
import { loadResourcesPreset } from './presets/loadResources';

export const createRenderer = (context) => {
  const ctx = {
    context,
    options: context.options,
    resources: [],
    renderAndView: () => '',
    renderAndUrl: () => '',
  };

  return utils.applyPresets(ctx, [loadResourcesPreset]);
};
