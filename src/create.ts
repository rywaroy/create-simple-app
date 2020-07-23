import path from 'path';
import checkAppName from './preset/checkAppName';
import createTargetDir from './preset/createTargetDir';
import Generator from './generator';
import { IPromptResult } from './types';
import babel from './plugins/babel';
import css from './plugins/css';
import eslint from './plugins/eslint';
import file from './plugins/file';
import init from './plugins/init';
import install from './plugins/install';
import jest from './plugins/jest';
import react from './plugins/react';
import typescript from './plugins/typescript';
import vue from './plugins/vue';

export default async function create(project: string | undefined, promptResult?: IPromptResult) {
  let projectName = '.';
  if (project) {
    projectName = project;
    checkAppName(projectName);
  }

  const targetDir = path.resolve(process.cwd(), projectName); // 生成项目的目录

  // 创建文件夹
  await createTargetDir(projectName, targetDir);

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
    plugins: [babel, css, eslint, file, init, install, jest, react, typescript, vue],
    pkg,
    promptResult,
  });

  // 调用实例的创建方法
  generator.create();
}
