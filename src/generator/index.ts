import { IPlugin } from '../types/plugin';

export default class Generator {
  plugins: IPlugin[];

  constructor(plugins: IPlugin[]) {
    this.plugins = plugins;
  }
}
