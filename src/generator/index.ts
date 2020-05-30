import inquirer from 'inquirer';
import { IPlugin, IPrompt, IPromptCallBack } from '../types';
import GeneratorAPI from './generatorAPI';

export default class Generator {
  plugins: IPlugin[];

  presetPrompts: IPrompt[];

  promptCallBacks: IPromptCallBack[];

  constructor(plugins: IPlugin[]) {
    this.plugins = plugins;
    this.presetPrompts = [];
    this.promptCallBacks = [];
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

  // 创建
  async create() {
    const result = await inquirer.prompt(this.presetPrompts); // 交互式选择配置
    // 预设回调
    this.promptCallBacks.forEach((cb) => {
      cb(result);
    });
  }
}
