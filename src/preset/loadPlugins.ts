import glob from 'glob';
import { IPlugin } from '../types/plugin';

import path = require('path');

export default function loadPlugins(): IPlugin[] {
  const plugins: IPlugin[] = [];
  const pluginPath = glob.sync('./plugins/*/index.js', {
    cwd: path.join(__dirname, '../../lib'),
  });
  pluginPath.forEach((item) => {
    const plugin: IPlugin = require(path.join('..', item)).default;
    plugins.push(plugin);
  });
  return plugins;
}
