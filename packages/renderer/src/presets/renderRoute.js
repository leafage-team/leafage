import { imports, utils } from '@leafage/toolkit';

const isRedirectStatusCode = (statusCode) => new Set([301, 302, 303, 307, 308]).has(statusCode);
const redirect = (url, init = 302) => {
  const responseInit = typeof init === 'number' ? { status: init } : init;

  const headers = new Headers(responseInit.headers);
  headers.set('Location', url);

  return new Response(null, utils.mergeProps(responseInit, { headers }));
};
export const json = (data, init = 200) => {
  const responseInit = typeof init === 'number' ? { status: init } : init;

  const headers = new Headers(responseInit.headers);

  return new Response(JSON.stringify(data), utils.mergeProps(responseInit, { headers }));
};
const loaderHandle = async (loaderFn, loaderContext, response) => {
  const res = await loaderFn?.(loaderContext);
  if (!(res instanceof Response)) return;

  res.headers.forEach((value, key) => response.set(key, value));
  response.status(res.status);

  if (isRedirectStatusCode(res.status)) return { redirected: true };
  if (res.ok) return res.json();
};

export const renderRoutePreset = (ctx) => {
  ctx.renderRoute = async (request, response) => {
    try {
      const resource = ctx.findResource(request.pathname);
      if (!resource) return;

      request.params = resource.params;
      const appLoaderContext = {
        request,
        params: request.params,
        query: request.query,
        json,
      };
      const loaderContext = utils.mergeProps(appLoaderContext, { redirect });

      const { loader: appLoader } = await imports.importServerModule('App', ctx.options);
      const { loader: viewLoader } = await imports.importServerModule(resource.view, ctx.options);

      const appProps = await loaderHandle(appLoader, appLoaderContext, response);
      const viewProps = await loaderHandle(viewLoader, loaderContext, response);
      if (viewProps && viewProps.redirected) return { redirected: true };

      const html = await ctx.render(resource.view, utils.mergeProps(appProps, viewProps));

      return { html };
    } catch (e) {
      return { error: e };
    }
  };
};
