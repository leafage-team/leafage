import { utils } from '@leafage/toolkit';
import { findResourcePreset } from './presets/findResource';
import { loadResourcePreset } from './presets/loadResource';
import { renderPreset } from './presets/render';

export const createRenderer = (context) => {
  const ctx = {
    context,
    config: context.config,
    isDev: context.config.dev,
    resources: [],
    findResource: () => null,
    render: () => '',
  };

  context.callHook('renderer:create');

  utils.applyPresets(
    ctx,
    [
      findResourcePreset,
      loadResourcePreset,
      renderPreset,
    ],
  );

  return {
    findResource: ctx.findResource,
    render: ctx.render,
  };
};
