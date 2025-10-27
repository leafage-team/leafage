import { utils } from '@leafage/toolkit';
import { createContext } from './common/utils';
import { resourcePreset } from './presets/resource';
import { renderPreset } from './presets/render';
import { renderRoutePreset } from './presets/renderRoute';
import { renderErrorPreset } from './presets/renderError';

export const createRenderer = (context) => {
  const ctx = createContext(context);

  context.callHook('renderer:create');

  return context.runWithContext(() => utils.applyPresets(
    ctx,
    [
      resourcePreset,
      renderPreset,
      renderRoutePreset,
      renderErrorPreset,
    ],
  ));
};
