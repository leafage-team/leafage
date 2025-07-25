const { getRollupConfig } = require('../../rollup.utils');

module.exports = ({ packageDir }) => [
  getRollupConfig({
    packageDir,
    format: 'cjs',
  }),
  getRollupConfig({
    packageDir,
    format: 'esm',
  }),
];
