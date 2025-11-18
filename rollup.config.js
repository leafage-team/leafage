const path = require('path');
const glob = require('fast-glob');
const rimraf = require('rimraf');

module.exports = () => {
  rimraf.sync('./packages/*/dist/', { glob: { nodir: false } });

  return glob.sync('./packages/*/rollup.config.js').flatMap((configPath) => {
    // eslint-disable-next-line import/no-dynamic-require
    const module = require(configPath);

    return module({
      packageDir: path.dirname(configPath),
    });
  });
};
