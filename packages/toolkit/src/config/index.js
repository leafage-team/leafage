import * as c12 from 'c12';
import common from './common';
import builder from './builder';
import server from './server';
import { mergeProps } from '../utils';

export const getConfig = (options = {}) => mergeProps(common, { builder, server }, options);
export const loadConfig = async (options = {}) => {
  const { config } = await c12.loadConfig(
    mergeProps(
      options,
      {
        name: 'leafage',
        dotenv: false,
        defaults: getConfig(),
      },
    ),
  );

  return config;
};
