import inquirer from 'inquirer';
import { EventEmitter } from 'events';
import WebpackConfig from 'webpack-chain';
import {
  IPlugin, IPrompt, IPromptCallBack, IPackage, IGeneratorOtions,
} from '../types';
import GeneratorAPI from './generatorAPI';

export default class Generator extends EventEmitter {
  plugins: IPlugin[];

  presetPrompts: IPrompt[];

  promptCallBacks: IPromptCallBack[];

  config: WebpackConfig

  pkg: IPackage;

  constructor(content: string, options: IGeneratorOtions) {
    super();
    this.emit('start');
    const { plugins, pkg } = options;
    this.plugins = plugins;
    this.pkg = pkg;
    this.config = new WebpackConfig();
    this.presetPrompts = [];
    this.promptCallBacks = [];
    this.installPlugins();
    this.emit('install-plugins');
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
  addPresetPrompts(prompt: IPrompt) {
    this.presetPrompts.push(prompt);
  }

  /**
   * 添加预设回调
   */
  addPresetPromptsCallBack(cd: IPromptCallBack) {
    this.promptCallBacks.push(cd);
  }

  /**
   * 判断插件
   */
  hasPlugin(id: string): boolean {
    return this.plugins.filter((item) => item.id === id).length > 0;
  }

  /**
   * 创建
   */
  async create() {
    this.emit('create');
    const result = await inquirer.prompt(this.presetPrompts); // 交互式选择配置
    // 预设回调
    this.promptCallBacks.forEach((cb) => {
      cb(result);
    });
    this.emit('after-prompts');
  }
}
