import { IPlugin } from '../types/plugin';
import GeneratorAPI from './generatorAPI';

export default class Generator {
  plugins: IPlugin[];

  constructor(plugins: IPlugin[]) {
    this.plugins = plugins;

    this.installPlugins();
  }

  installPlugins() {
    this.plugins.forEach((plugin) => {
      const { id, apply } = plugin;
      const api = new GeneratorAPI(id, this);
    });
  }
}
