const path = require('path');
const rimraf = require('rimraf');
const glob = require('fast-glob');

module.exports = () => {
  rimraf.sync('./packages/*/dist/', { glob: { nodir: false } });

  return glob.sync('./packages/*/rollup.config.js').flatMap((id) => {
    // eslint-disable-next-line import/no-dynamic-require
    const module = require(id);

    return module({
      packageDir: path.dirname(id),
    });
  });
};
