import inquirer from 'inquirer';
import { EventEmitter } from 'events';
import { IPlugin, IPrompt, IPromptCallBack } from '../types';
import GeneratorAPI from './generatorAPI';

export default class Generator extends EventEmitter {
  plugins: IPlugin[];

  presetPrompts: IPrompt[];

  promptCallBacks: IPromptCallBack[];

  constructor(plugins: IPlugin[]) {
    super();
    this.emit('start');
    this.plugins = plugins;
    this.presetPrompts = [];
    this.promptCallBacks = [];
    this.emit('install-plugins');
    this.installPlugins();
  }

  // 加载插件
  installPlugins() {
    this.plugins.forEach((plugin) => {
      const { id, apply } = plugin;
      const api = new GeneratorAPI(id, this);
      apply(api);
    });
  }

  // 判断插件
  hasPlugin(id: string): boolean {
    return this.plugins.filter((item) => item.id === id).length > 0;
  }

  // 创建
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
