import cac from 'cac';
import { logger } from '@leafage/toolkit';
import { applyDevCommand } from './commands/dev';
import { applyBuildCommand } from './commands/build';
import { applyStartCommand } from './commands/start';

const initNodeEnv = () => {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = ['build', 'start'].includes(process.argv[2]) ? 'production' : 'development';
  }
};
const setupLogLevel = () => {
  const logLevelIndex = process.argv.findIndex((row) => row === '--log-level' || row === '--logLevel');
  if (logLevelIndex !== -1) {
    const level = process.argv[logLevelIndex + 1];
    if (level && ['warn', 'error', 'silent'].includes(level)) {
      logger.level = level;
    }
  }
};
const showCliInfo = () => {
  if (process.argv.some((row) => row === '--help' || row === '-h')) {
    return;
  }

  logger.log('leafage/%s \n', process.env.PACKAGE_VERSION);
};
const setupCommands = () => {
  const cli = cac('leafage');

  cli.help();
  cli.version(process.env.PACKAGE_VERSION);

  cli.option(
    '-r, --root <root>',
    'Specify the working directory',
    { default: '.' },
  );
  cli.option(
    '--env-name <name>',
    'Set the build mode (default is development or production)',
  );
  cli.option(
    '--log-level <level>',
    'Set the log level (info | warn | error | silent)',
  );

  applyDevCommand(cli.command('dev', 'Start the dev server'));
  applyBuildCommand(cli.command('build', 'Build the app for production'));
  applyStartCommand(cli.command('start', 'Start the production build locally'));

  cli.parse();
};
export const run = () => {
  initNodeEnv();
  setupLogLevel();
  showCliInfo();

  try {
    setupCommands();
  } catch (err) {
    logger.error('Failed to start Leafage CLI.');
    logger.error(err);
  }
};
