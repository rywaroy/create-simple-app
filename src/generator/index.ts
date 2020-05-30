import inquirer from 'inquirer';
import { IPlugin, IPrompt } from '../types';
import GeneratorAPI from './generatorAPI';

export default class Generator {
  plugins: IPlugin[];

  presetPrompts: IPrompt[];

  constructor(plugins: IPlugin[]) {
    this.plugins = plugins;
    this.presetPrompts = [];
    this.installPlugins();
  }

  installPlugins() {
    this.plugins.forEach((plugin) => {
      const { id, apply } = plugin;
      const api = new GeneratorAPI(id, this);
      apply(api);
    });
  }

  async create() {
    const result = await inquirer.prompt(this.presetPrompts);
    console.log(result);
  }
}
