import commander from 'commander';
import path from 'path';
import checkAppName from './preset/checkAppName';
import createTargetDir from './preset/createTargetDir';
import loadPlugins from './preset/loadPlugins';
import Generator from './generator';

const packageJson = require('../package.json');

let projectName: string = '.';

const { program } = commander;

program
  .version(packageJson.version)
  .arguments('<project-directory>');

program.parse(process.argv);

async function run() {
  if (program.args.length > 0) { // 创建新文件夹
    [projectName] = program.args;

    // 检查合法应用名
    checkAppName(projectName);
  }

  const targetDir = path.resolve(process.cwd(), projectName); // 生成项目的目录

  // 创建文件夹
  await createTargetDir(projectName, targetDir);

  // 遍历加载插件
  const plugins = loadPlugins();

  const name = projectName === '.' ? path.basename(process.cwd()) : projectName;

  // 生成package.json
  const pkg = {
    name,
    version: '0.1.0',
    scripts: {},
    devDependencies: {},
    dependencies: {},
  };

  // 初始化Generator类型
  const generator = new Generator(targetDir, {
    plugins,
    pkg,
  });

  // 调用实例的创建方法
  generator.create();
}

run();
