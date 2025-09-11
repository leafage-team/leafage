import fs from 'fs';
import { join } from 'path';
import { expand } from 'dotenv-expand';
import { mergeProps } from './utils';

const DOTENV_LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;
const isFileSync = (filePath) => {
  try {
    return fs.statSync(filePath, { throwIfNoEntry: false })?.isFile();
  } catch (_) {
    return false;
  }
};
/**
 * https://github.com/motdotla/dotenv/blob/v16.5.0/lib/main.js#L9-L48
 */
const parse = (src) => {
  const obj = {};

  // Convert buffer to string
  let lines = src.toString();

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/gm, '\n');

  let match = null;
  // biomes-ignore lint/suspicious/noAssignInExpressions: allowed
  // eslint-disable-next-line no-cond-assign
  while ((match = DOTENV_LINE.exec(lines)) != null) {
    const key = match[1];

    // Default undefined or null to empty string
    let value = match[2] || '';

    // Remove whitespace
    value = value.trim();

    // Check if double-quoted
    const maybeQuote = value[0];

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, '$2');

    // Expand newlines if double-quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    obj[key] = value;
  }

  return obj;
};
export const loadEnv = ({
  cwd = process.cwd(),
  mode = process.env.NODE_ENV,
  systemVars = true,
  processEnv = process.env,
} = {}) => {
  if (mode === 'local') {
    throw new Error(
      'local cannot be used as a value for env mode, because .env.local represents a temporary local file. Please use another value.',
    );
  }

  const filenames = [
    '.env',
    '.env.local',
    `.env.${mode}`,
    `.env.${mode}.local`,
  ];

  const filePaths = filenames
    .map((filename) => join(cwd, filename))
    .filter(isFileSync);

  let parsed = {};

  filePaths.forEach((envPath) => {
    parsed = mergeProps(parsed, parse(fs.readFileSync(envPath)));
  });

  // dotenv-expand does not override existing env vars by default,
  // but we should allow overriding NODE_ENV, which is very common.
  if (parsed.NODE_ENV) {
    processEnv.NODE_ENV = parsed.NODE_ENV;
  }

  expand({ parsed, processEnv });

  if (systemVars) {
    parsed = mergeProps(parsed, processEnv);
  }

  return {
    parsed,
    filePaths,
  };
};
