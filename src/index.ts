import commander from 'commander';
import checkAppName from './checkAppName';
import createTargetDir from './createTargetDir';

const packageJson = require('../package.json');

let projectName: string = '.';

const { program } = commander;

program
  .version(packageJson.version)
  .arguments('<project-directory>');

program.parse(process.argv);

if (program.args.length > 0) { // 创建新文件夹
  [projectName] = program.args;

  // 检查合法应用名
  checkAppName(projectName);
}

// 创建文件夹
createTargetDir(projectName);
