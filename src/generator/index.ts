import inquirer from 'inquirer';
import { EventEmitter } from 'events';
import WebpackConfig from 'webpack-chain';
import fs from 'fs-extra';
import path from 'path';
import {
  IPlugin, IPrompt, IPromptCallBack, IPackage, IGeneratorOtions, IModulePrompt, IPromptResult,
} from '../types';
import GeneratorAPI from './generatorAPI';
import createTargetDir from '../preset/createTargetDir';
import { codeFormat, codeFormatJson } from '../utils/codeFormat';

export default class Generator extends EventEmitter {
  private plugins: IPlugin[];

  presetPrompts: IPrompt[];

  promptCallBacks: IPromptCallBack[];

  modulePrompts: IModulePrompt[];

  config: WebpackConfig

  pkg: IPackage;

  promptResult?: IPromptResult;

  context: string;

  projectName?: string;

  constructor(context: string, options: IGeneratorOtions) {
    super();
    this.context = context;
    const { plugins, pkg, promptResult, projectName } = options;
    this.plugins = plugins;
    this.pkg = pkg;
    this.projectName = projectName;
    this.config = new WebpackConfig();
    this.presetPrompts = [];
    this.promptCallBacks = [];
    this.modulePrompts = [];
    this.promptResult = promptResult;
    this.installPlugins();
  }

  /**
   * 加载插件
   */
  installPlugins() {
    this.plugins.forEach((plugin) => {
      const { id, apply } = plugin;
      const api = new GeneratorAPI(id, this);
      apply(api);
    });
  }

  /**
   * 添加预设选项
   */
  addPresetPrompt(prompt: IPrompt) {
    this.presetPrompts.push(prompt);
  }

  /**
   * 添加预设回调
   */
  addPresetPromptCallBack(cd: IPromptCallBack) {
    this.promptCallBacks.push(cd);
  }

  /**
   * 添加模块选项
   */
  addModulePrompt(prompt: IModulePrompt) {
    this.modulePrompts.push(prompt);
  }

  /**
   * 判断插件
   */
  hasPlugin(id: string): boolean {
    return this.plugins.filter((item) => item.id === id).length > 0;
  }

  /**
   * 获取Prompts
   */
  getPrompts() {
    return this.presetPrompts;
  }

  /**
   * 获取modulePrompts
   */
  getModulePrompts() {
    return this.modulePrompts;
  }

  /**
   * 创建
   */
  async create() {
    // 创建文件夹
    if (this.projectName) {
      await createTargetDir(this.projectName, this.context);
    }

    this.presetPrompts.unshift({
      name: 'module',
      type: 'checkbox',
      message: '请选择需要的功能:',
      choices: this.modulePrompts,
    });

    let result: any;
    if (this.promptResult) {
      result = this.promptResult;
    } else {
      result = await inquirer.prompt(this.presetPrompts); // 交互式选择配置
    }

    // 预设回调
    this.promptCallBacks.forEach((cb) => {
      cb(result);
    });

    if (this.projectName) {
      fs.writeFileSync(path.join(this.context, 'webpack.config.js'), codeFormat(`module.exports = ${this.config.toString()}`));
    }

    fs.writeFileSync(path.join(this.context, 'package.json'), codeFormatJson(JSON.stringify(this.pkg)));
    this.emit('after-create');
  }
}
