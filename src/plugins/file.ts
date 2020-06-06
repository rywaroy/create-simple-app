import GeneratorAPI from '../generator/generatorAPI';

const filePlugin = {
  id: 'file',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'file-loader img/font',
      value: 'file',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了file
      if (module.includes('file')) {
        api.chainWebpack()
          .module
          .rule('image')
          .test(/\.(png|jpg|gif)$/)
          .use('url-loader')
          .loader('url-loader')
          .options({
            limit: 8192,
            name: 'images/[name]_[hash:8].[ext]',
          });
        api.chainWebpack()
          .module
          .rule('font')
          .test(/\.(eot|woff2?|ttf|svg)$/)
          .use('url-loader')
          .loader('url-loader')
          .options({
            limit: 8192,
            name: 'font/[name]_[hash:8].[ext]',
          });
        api.extendPackage({
          devDependencies: {
            'url-loader': '^4.1.0',
            'file-loader': '^6.0.0',
          },
        });
      }
    });
  },
};

export default filePlugin;
