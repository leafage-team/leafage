import WebpackNodeExternals from 'webpack-node-externals';

export const externalPreset = (ctx) => {
  if (ctx.isServer) {
    ctx.config.externals.push(
      WebpackNodeExternals({
        // load non-javascript files with extensions, presumably via loaders
        allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
      }),
    );
  }
};
