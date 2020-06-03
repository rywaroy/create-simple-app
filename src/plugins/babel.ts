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
          .test(/\.js(x?)$/)
          .exclude
          .add(/node_modules/)
          .end()
          .use('babel-loader')
          .loader('babel-loader');
        api.extendPackage({
          devDependencies: {
            '@babel/core': '^7.10.2',
            '@babel/preset-env': '^7.10.2',
            'babel-loader': '^8.1.0',
          },
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
