import * as c12 from 'c12';
import { applyDefaults } from 'untyped';
import common from './common';
import builder from './builder';
import server from './server';
import { mergeProps } from '../utils';

export const loadConfig = async (options = {}) => {
  const { config: loadUserConfig } = await c12.loadConfig(
    mergeProps(
      options,
      {
        name: 'leafage',
        dotenv: false,
      },
    ),
  );
  const defaultConfig = mergeProps(common, { builder, server });

  return applyDefaults(defaultConfig, loadUserConfig);
};
