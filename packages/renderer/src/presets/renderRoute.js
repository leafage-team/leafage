import { imports, utils } from '@leafage/toolkit';

export const renderRoutePreset = (ctx) => {
  ctx.renderRoute = async (req, res) => {
    const resource = ctx.findResource(req.pathname);
    if (!resource) return;

    req.params = resource.params;
    const { loader: appLoader } = await imports.importServerModule('App', ctx.options);
    const { loader: viewLoader } = await imports.importServerModule(resource.view, ctx.options);
    const loaderContext = { req, res };
    const appProps = await appLoader?.(loaderContext);
    const viewProps = await viewLoader?.(loaderContext);
    const props = utils.mergeProps(appProps, viewProps);

    return ctx.render(resource.view, props);
  };
};
