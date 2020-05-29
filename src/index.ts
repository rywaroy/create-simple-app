import commander from 'commander';
import checkAppName from './checkAppName';
import checkTargetDir from './checkTargetDir';

const path = require('path');
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

const targetDir = path.resolve(process.cwd(), projectName); // 生成项目的目录

// 检查文件夹
checkTargetDir(targetDir);
