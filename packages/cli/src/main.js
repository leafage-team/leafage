import cac from 'cac';
import { applyDevCommand } from './commands/dev';
import { applyBuildCommand } from './commands/build';
import { applyStartCommand } from './commands/start';

export const run = () => {
  const cli = cac('leafage');

  cli.help();
  cli.version(process.env.npm_package_version);

  cli.option(
    '-r, --root <root>',
    'Specify the working directory',
    { default: '.' },
  );
  cli.option(
    '--env-name <name>',
    'Set the build mode (default is development or production)',
  );

  applyDevCommand(cli.command('dev', 'Start the dev server'));
  applyBuildCommand(cli.command('build', 'Build the app for production'));
  applyStartCommand(cli.command('start', 'Start the production build locally'));

  cli.parse();
};
