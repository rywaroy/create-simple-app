import glob from 'glob';

import path = require('path');

type PluginFunction = () => void;

export default function loadPlugins(): PluginFunction[] {
  const plugins: PluginFunction[] = [];
  const pluginPath = glob.sync('./plugins/*.js', {
    cwd: path.join(process.cwd(), 'lib'),
  });
  pluginPath.forEach((item) => {
    const plugin: PluginFunction = require(item).default;
    plugins.push(plugin);
  });
  return plugins;
}
