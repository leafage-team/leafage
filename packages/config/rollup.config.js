import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeExternals } from 'rollup-plugin-node-externals';

export default defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    // 支持第三方模块
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    // 支持 commonjs 格式
    commonjs(),
    // babel
    babel({
      presets: [
        '@babel/preset-env',
      ],
      babelHelpers: 'bundled',
    }),
    // json
    json(),
    // externals
    nodeExternals({
      deps: true,
      devDeps: false,
    }),
  ],
});
