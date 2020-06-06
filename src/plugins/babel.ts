import GeneratorAPI from '../generator/generatorAPI';

const babelPlugin = {
  id: 'babel',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Babel',
      value: 'babel',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了bebel
      if (module.includes('babel')) {
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
            'babel-plugin-transform-class-properties': '^6.24.1',
          },
          babel: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  corejs: 3,
                },
              ],
            ],
            plugins: ['transform-class-properties'],
          },
        });

        // 选择了typescript添加配置
        if (module.includes('typescript')) {
          api.extendPackage({
            devDependencies: {
              '@babel/preset-typescript': '^7.8.3',
            },
            babel: {
              presets: ['@babel/preset-typescript'],
            },
          });
        }
      }
    });
  },
};

export default babelPlugin;
