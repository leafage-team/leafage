import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeExternals } from 'rollup-plugin-node-externals';

export default defineConfig({
  input: [
    './src/App.jsx',
    './src/Document.jsx',
    './src/Error.jsx',
    './src/RenderJudge.jsx',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
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
        '@babel/preset-react',
      ],
    }),
    // json
    json(),
    // externals
    nodeExternals({
      deps: true,
      devDeps: true,
    }),
  ],
});
