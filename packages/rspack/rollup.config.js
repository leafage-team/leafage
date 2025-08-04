const path = require('path');
const { getRollupConfig } = require('../../rollup.utils');

module.exports = ({ packageDir }) => {
  const resolve = (dir) => path.join(process.cwd(), packageDir, dir);

  return [
    getRollupConfig({
      packageDir,
      format: 'cjs',
    }),
    getRollupConfig({
      packageDir,
      format: 'esm',
    }),

    getRollupConfig({
      packageDir,
      format: 'cjs',
      config: {
        input: resolve('src/loader/client-entry-loader.js'),
        output: {
          dir: resolve('dist/loader'),
          preserveModules: false,
        },
      },
    }),
    getRollupConfig({
      packageDir,
      format: 'esm',
      config: {
        input: resolve('src/loader/client-entry-loader.js'),
        output: {
          dir: resolve('dist/esm/loader'),
          preserveModules: false,
        },
      },
    }),
  ];
};
