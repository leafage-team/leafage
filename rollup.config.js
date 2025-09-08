const path = require('path');
const rimraf = require('rimraf');

const packages = [
  'toolkit',
  'cli',
  'component',
  'renderer',
  'rspack',
  'server',
  'leafage',
];
module.exports = () => {
  rimraf.sync('./packages/*/dist/', { glob: { nodir: false } });

  return packages.flatMap((id) => {
    const configPath = `./packages/${id}/rollup.config.js`;
    // eslint-disable-next-line import/no-dynamic-require
    const module = require(configPath);

    return module({
      packageDir: path.dirname(configPath),
    });
  });
};
