import glob from 'glob';
import { IPlugin } from '../types/plugin';

import path = require('path');

export default function loadPlugins(): IPlugin[] {
  const plugins: IPlugin[] = [];
  const pluginPath = glob.sync('./plugins/*.js', {
    cwd: path.join(process.cwd(), 'lib'),
  });
  pluginPath.forEach((item) => {
    const plugin: IPlugin = require(path.join('..', item)).default;
    plugins.push(plugin);
  });
  return plugins;
}
