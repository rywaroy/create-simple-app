import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import GeneratorAPI from '../generator/generatorAPI';

const initPlugin = {
  id: 'init',
  apply: (api: GeneratorAPI) => {
    // webpack 配置
    api.chainWebpack()
      .entry('index') // entry 配置
      .add('./src/index.js')
      .end()
      .output // output 配置
      .filename('bundle.js')
      .end()
      .mode('development')
      .devServer // devServer 配置
      .hot(true)
      .compress(true)
      .port(8080)
      .end()
      .plugin('html-template')
      .use(HtmlWebpackPlugin, [{
        template: 'src/index.html',
      }]);

    // package.json 配置
    api.extendPackage({
      devDependencies: {
        'html-webpack-plugin': '^4.3.0',
        webpack: '^4.43.0',
        'webpack-cli': '^3.3.11',
        'webpack-dev-server': '^3.11.0',
      },
      scripts: {
        build: 'webpack',
        dev: 'webpack-dev-server',
      },
    });

    // 渲染模板
    api.render(path.join(__dirname, '../../template'));
  },
};

export default initPlugin;
