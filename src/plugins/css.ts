import GeneratorAPI from '../generator/generatorAPI';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// @ts-ignore
MiniCssExtractPlugin.__expression = 'require(\'mini-css-extract-plugin\')';
const MiniCssExtractPluginLoader = {
  __expression: '',
};
MiniCssExtractPluginLoader.__expression = 'require(\'mini-css-extract-plugin\').loader';

const installPlugin = {
  id: 'install',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'css less/postcss',
      value: 'css',
    });
    api.addPresetPromptCallBack(({ module }) => {
      // 判断是否选择了css
      if ((module as string[]).includes('css')) {
        // 添加依赖
        api.extendPackage({
          autoprefixer: '^9.8.0',
          'css-loader': '^3.5.3',
          less: '^3.11.2',
          'less-loader': '^6.1.0',
          'postcss-loader': '^3.0.0',
        });

        // 配置css
        api.chainWebpack()
          .module
          .rule('css')
          .test(/\.css$/)
          .use('mini-css')
          // @ts-ignore
          .loader(MiniCssExtractPluginLoader)
          .end()
          .use('postcss-loader')
          .loader('postcss-loader')
          .end()
          .use('css-loader')
          .loader('css-loader')
          .end();

        // 配置less
        api.chainWebpack()
          .module
          .rule('less')
          .test(/\.less$/)
          .use('mini-css')
          // @ts-ignore
          .loader(MiniCssExtractPluginLoader)
          .end()
          .use('css-loader')
          .loader('css-loader')
          .end()
          .use('postcss-loader')
          .loader('postcss-loader')
          .end()
          .use('less-loader')
          .loader('less-loader')
          .end();

        // 配置mini-css-extract-plugin插件
        api.chainWebpack()
          .plugin('mini-css-extract-plugin')
          .use(MiniCssExtractPlugin, [{
            filename: '[name].css',
          }]);

        api.render('postcss.config.js', `
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
        `);
      }
    });
  },
};

export default installPlugin;
