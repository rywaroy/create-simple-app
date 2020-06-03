import GeneratorAPI from '../generator/generatorAPI';

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
          'style-loader': '^1.2.1',
        });

        // 配置css
        api.chainWebpack()
          .module
          .rule('css')
          .test(/\.css$/)
          .use('style-loader')
          .loader('style-loader')
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
          .use('style-loader')
          .loader('style-loader')
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
