import GeneratorAPI from '../generator/generatorAPI';

const installPlugin = {
  id: 'install',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'babel',
      value: 'babel',
    });
    api.addPresetPromptCallBack(({ module }) => {
      // 判断是否选择了bebel
      if ((module as string[]).includes('babel')) {
        api.chainWebpack()
          .module
          .rule('babel')
          .test(/\.js$/)
          .exclude
          .add(/node_modules/)
          .end()
          .use('babel-loader')
          .loader('babel-loader');
        api.extendPackage({
          babel: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                },
              ],
            ],
          },
        });
      }
    });
  },
};

export default installPlugin;
