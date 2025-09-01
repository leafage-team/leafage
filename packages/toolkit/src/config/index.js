import * as c12 from 'c12';
import { createDefu } from 'defu';
import common from './common';
import builder from './builder';
import server from './server';
import { mergeProps } from '../utils';

const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = obj[key].concat(value);
    return true;
  }
});

export const getConfig = (options = {}) => mergeProps(common, { builder, server }, options);
export const loadConfig = async (options = {}) => {
  const { config } = await c12.loadConfig(
    mergeProps(
      options,
      {
        name: 'leafage',
        dotenv: false,
        defaults: getConfig(),
        merger,
      },
    ),
  );

  return config;
};
