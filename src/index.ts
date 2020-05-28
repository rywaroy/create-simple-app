import commander from 'commander';
import checkAppName from './checkAppName';

const packageJson = require('../package.json');

let projectName: string = '';

const { program } = commander;

program
  .version(packageJson.version)
  .arguments('<project-directory>')
  .action((name: string) => {
    projectName = name;
  });

program.parse(process.argv);

checkAppName(projectName);
