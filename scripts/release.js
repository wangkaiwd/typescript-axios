const enquirer = require('enquirer');
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const semver = require('semver');
const step = (msg) => console.log(chalk.cyan(msg));
const pkg = require('../package.json');
const execa = require('execa');
const currentVersion = pkg.version;
const incrementVersions = ['patch', 'minor', 'major'];
const dryRun = args.dryRun;
const npmRegistry = 'https://registry.npmjs.org';
const run = (cmd, args, options) => {
  return execa(cmd, args, { stdio: 'inherit', ...options });
};

const ifDryRun = (cmd, args, options) => dryRun ? console.log(cmd + ' ' + args.join(' ')) : run(cmd, args, options);
const inc = (i) => semver.inc(currentVersion, i);

const doBuild = async (newVersion) => {
  step('\nBuild package...');
  await ifDryRun('npm', ['run', 'build']);

  step('\nBump version...');
  await ifDryRun(`npm`, ['version', newVersion, '-m', `chore(version): bump version to v${newVersion}`]);

  step('\nGenerate changelog...');
  await ifDryRun('npm', ['run', 'genlog']);

  step('\nCommit changes...');
  await ifDryRun('git', ['add', '.']);
  await ifDryRun(`git`, ['commit', '-m', `chore(release): release v${newVersion}`]);

  step('\nPublish package to npm...');
  await ifDryRun('npm', ['publish', '--reg', npmRegistry]);

  step('\nPush to github...');
  await ifDryRun('git', ['push']);
  await ifDryRun(`git`, ['push', 'origin', `v${newVersion}`]);

  step('\nRelease successfully');
};
const main = async () => {
  const answer = await enquirer.prompt(
    {
      type: 'select',
      name: 'version',
      message: 'Select release type',
      choices: incrementVersions.map(type => {
        const versionNumber = inc(type);
        return { message: `${type} ${versionNumber}`, name: inc(type) };
      }).concat('custom')
    });
  let newVersion = answer.version;
  if (newVersion === 'custom') {
    const { custom } = await enquirer.prompt({
      type: 'input',
      name: 'custom',
      message: 'Please input new version',
      initial: currentVersion,
      validate (value) {
        if (semver.valid(value)) {
          return true;
        } else {
          return 'Please input a valid package version';
        }
      }
    });
    newVersion = custom;
  }
  const { goOn } = await enquirer.prompt({
    type: 'confirm',
    name: 'goOn',
    message: `Release v${newVersion}. Confirm ?`
  });
  if (goOn) {
    await doBuild(newVersion);
  }
};

main().then(() => {

}).catch((err) => {
  console.log('error', err);
});
