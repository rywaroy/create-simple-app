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
        api.extendPackage({
          'css-loader': '^3.5.3',
          less: '^3.11.2',
          'less-loader': '^6.1.0',
          'style-loader': '^1.2.1',
        });
        api.chainWebpack()
          .module
          .rule('css')
          .test(/\.css$/)
          .use('style-loader')
          .loader('style-loader')
          .end()
          .use('css-loader')
          .loader('css-loader')
          .end();
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
          .use('less-loader')
          .loader('less-loader')
          .end();
      }
    });
  },
};

export default installPlugin;
