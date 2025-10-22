import path from 'pathe';
import { RspackManifestPlugin } from 'rspack-manifest-plugin';
import { utils } from '@leafage/toolkit';

export const manifestPreset = (ctx) => {
  if (ctx.isClient) {
    ctx.config.plugins.push(
      new RspackManifestPlugin({
        fileName: path.join(ctx.options.dir.root, ctx.options.dir.dist, ctx.options.dir.manifest),
        generate: (seed, files, entryPoints) => Object
          .keys(entryPoints)
          .map((view) => {
            const fileList = entryPoints[view].map((file) => `${ctx.options.builder.publicPath}${file}`);
            const styles = [];
            const scripts = [];
            // index            => /
            // home/index       => /home
            // blog/_id/index   => /blog/:id
            // blog/_id$/index  => /blog/:id?
            const routeArr = view
              .replace(/\/?index$/, '')
              .split('/')
              .map((route) => route
                .replace(/^_/, ':')
                .replace(/\$$/, '?'))
              .filter(Boolean);

            fileList.forEach((file) => {
              if (/\.css$/.test(file)) styles.push(file);

              if (/\.js$/.test(file) && !/\.hot-update.js$/.test(file)) scripts.push(file);
            });

            const pagePath = `/${routeArr.join('/')}`;
            const pageRoute = utils.toArray(ctx.options.server.customRoutes[pagePath] ?? pagePath).filter(Boolean);

            return {
              view,
              path: pageRoute,
              styles,
              scripts,
            };
          }),
      }),
    );
  }
};
