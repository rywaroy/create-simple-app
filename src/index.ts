import commander from 'commander';
import checkAppName from './checkAppName';
import checkTargetDir from './checkTargetDir';

const path = require('path');
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

// 检查合法应用名
checkAppName(projectName);

const targetDir = path.resolve(process.cwd(), projectName); // 生成项目的目录

// 检查文件夹
checkTargetDir(targetDir);
