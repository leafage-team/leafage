import * as c12 from 'c12';
import common from './common';
import builder from './builder';
import server from './server';
import { mergeProps } from '../utils';

export const loadConfig = async (options = {}) => {
  const defaults = mergeProps(common, { builder, server });

  const { config } = await c12.loadConfig(
    mergeProps(
      options,
      {
        name: 'leafage',
        dotenv: false,
        defaults,
      },
    ),
  );

  return config;
};
