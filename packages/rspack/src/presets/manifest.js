import { RspackManifestPlugin } from 'rspack-manifest-plugin';

export const manifestPreset = (ctx) => {
  if (!ctx.isClient) return;

  ctx.config.plugins.push(
    new RspackManifestPlugin({
      fileName: ctx.options.output.manifest,
      generate: (seed, files, entryPoints) => Object
        .keys(entryPoints)
        .map((view) => {
          const fileList = entryPoints[view].map((file) => `${ctx.options.output.assetPrefix}${file}`);
          const styles = [];
          const scripts = [];

          fileList.forEach((file) => {
            if (/\.css$/.test(file)) styles.push(file);

            if (/\.js$/.test(file) && !/\.hot-update.js$/.test(file)) scripts.push(file);
          });

          return {
            view,
            styles,
            scripts,
          };
        }),
    }),
  );
};
