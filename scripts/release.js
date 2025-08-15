const { execSync } = require('child_process');
const { prompt } = require('enquirer');
const semver = require('semver');
const pico = require('picocolors');
const pkg = require('../package.json');

const log = {
// eslint-disable-next-line no-console
  info: (msg) => console.log(pico.cyan(msg)),
  // eslint-disable-next-line no-console
  error: (msg) => console.error(pico.red(msg)),
};
const execCommand = (command, description) => {
  const commands = Array.isArray(command) ? command : [command];

  try {
    log.info(`\n⚡ ${description}...`);
    commands.forEach((cmd) => execSync(cmd, { stdio: 'inherit' }));
    log.info(`✅ ${description} Successfully`);
  } catch (error) {
    log.error(`❌ ${description} failed`);
    throw error;
  }
};
const run = async () => {
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: ['patch', 'minor', 'major'],
  });
  const targetVersion = semver.inc(pkg.version, release);
  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing v${targetVersion}. Confirm?`,
  });
  if (!confirm) return;

  execCommand('pnpm run clean:dist-all', 'Clean dist');
  execCommand(
    [
      `pnpm version ${targetVersion} --no-git-tag-version`,
      `pnpm -r --filter=./packages/* exec pnpm version ${targetVersion} --no-git-tag-version`,
    ],
    'Update versions',
  );
  execCommand('pnpm run changelog', 'Generate changelog');
  execCommand(
    [
      'git add .',
      `git commit -m "chore(release): v${targetVersion}"`,
    ],
    'Committing changes',
  );
  execCommand('pnpm run build', 'Build packages');
  execCommand(
    'pnpm -r --filter=./packages/* publish --access public --registry https://registry.npmjs.org',
    'Publish packages',
  );
  execCommand(
    [
      `git tag -a v${targetVersion} -m "Release v${targetVersion}"`,
      `git push origin v${targetVersion}`,
      'git push',
    ],
    'Push changes and tags',
  );
};

run()
  .catch((err) => {
    log.error(err);
    process.exit(1);
  });
