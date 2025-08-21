import { match as createRegexpMatch } from 'path-to-regexp';
import { imports, utils } from '@leafage/toolkit';

export const renderAndRouterPreset = (ctx) => {
  const matchOptions = {
    decode: decodeURIComponent,
    strict: true,
    end: true,
    sensitive: false,
  };
  ctx.renderAndRouter = async (req, res) => {
    const resource = ctx.resources.find((row) => {
      const matchFn = createRegexpMatch(row.path, matchOptions);
      const result = matchFn(req.pathname);
      if (result) {
        req.params = result.params || {};
      }

      return result;
    });
    if (!resource) {
      return;
    }
    const { loader: appLoader } = await imports.importServerModule('App', ctx.options);
    const { loader: viewLoader } = await imports.importServerModule(resource.view, ctx.options);
    const loaderContext = { req, res };
    const appProps = await appLoader?.(loaderContext);
    const viewProps = await viewLoader?.(loaderContext);
    const props = utils.mergeProps(appProps, viewProps);

    return ctx.renderAndView(resource.view, props);
  };
};
