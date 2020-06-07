import GeneratorAPI from '../../generator/generatorAPI';

const VueLoaderPlugin = {
  __expression: 'require(\'vue-loader/lib/plugin\')',
};

const vuePlugin = {
  id: 'vue',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Vue',
      value: 'vue',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了vue
      if (module.includes('vue')) {
        api.chainWebpack()
          .module
          .rule('vue')
          .test(/\.vue$/)
          .use('vue-loader')
          .loader('vue-loader');
        api.chainWebpack()
          .plugin('vue-loader-plugin')
          // @ts-ignore
          .use(VueLoaderPlugin);
        api.extendPackage({
          devDependencies: {
            'vue-loader': '^15.9.2',
            'vue-style-loader': '^4.1.2',
            'vue-template-compiler': '^2.6.11',
          },
          dependencies: {
            vue: '^2.6.11',
            'vue-router': '^3.3.2',
            vuex: '^3.4.0',
          },
        });
      }
    });
  },
};

export default vuePlugin;
