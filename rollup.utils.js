const path = require('path');
const { defineConfig } = require('rollup');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const { default: commonjs } = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { default: json } = require('@rollup/plugin-json');
const { nodeExternals } = require('rollup-plugin-node-externals');
const mergeFn = require('rollup-merge-config');
const replace = require('@rollup/plugin-replace');
const alias = require('@rollup/plugin-alias');

const resolve = (...dir) => path.join(process.cwd(), ...dir);

const createBanner = (packageDir) => {
  // eslint-disable-next-line import/no-dynamic-require
  const { name, version } = require(resolve(packageDir, 'package.json'));

  return `/**
 * ${name} v${version}
 *
 * Copyright (c) Leafage.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */`;
};

const getRollupConfig = ({ packageDir, config, format } = {}) => {
  const resolveFn = (dir) => resolve(packageDir, dir);

  return mergeFn(
    defineConfig({
      input: resolveFn('src/index.js'),
      output: {
        dir: resolveFn(format === 'cjs' ? 'dist' : `dist/${format || ''}`),
        format,
        preserveModules: true,
        exports: 'named',
        banner: createBanner(packageDir),
      },
      plugins: [
        // 支持第三方模块
        nodeResolve({
          extensions: ['.js', '.jsx'],
        }),
        // 支持 commonjs 格式
        commonjs(),
        // babel
        babel({
          babelHelpers: 'bundled',
        }),
        // json
        json(),
        // externals
        nodeExternals({
          packagePath: resolveFn('package.json'),
          deps: true,
          devDeps: true,
        }),
        // 替换环境变量
        replace({
          values: {
            'process.env.PACKAGE_NAME': JSON.stringify('leafage'),
            'process.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
          },
          preventAssignment: true,
        }),
        // 别名
        alias({
          entries: [
            {
              find: '@',
              replacement: resolveFn('src'),
            },
          ],
        }),
      ],
    }),
    config,
  );
};

module.exports = {
  resolve,
  createBanner,
  getRollupConfig,
};
