import path from 'path';
import GeneratorAPI from '../../generator/generatorAPI';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

CleanWebpackPlugin.__expression = 'require(\'clean-webpack-plugin\').CleanWebpackPlugin';

const HtmlWebpackPlugin = require('html-webpack-plugin');

HtmlWebpackPlugin.__expression = 'require(\'html-webpack-plugin\')';

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
      }])
      .end()
      .plugin('clean-webpack-plugin')
      .use(CleanWebpackPlugin);

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
      browserslist: [
        'last 2 versions',
        '> 1%',
        'iOS 7',
        'last 3 iOS versions',
      ],
    });

    // 渲染模板
    api.copy(path.join(__dirname, './template'));
  },
};

export default initPlugin;
