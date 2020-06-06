import GeneratorAPI from '../generator/generatorAPI';

const reactPlugin = {
  id: 'react',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'React',
      value: 'react',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了react
      if (module.includes('react')) {
        api.extendPackage({
          devDependencies: {
            '@babel/preset-react': '^7.10.1',
          },
          dependencies: {
            react: '^16.13.1',
            'react-dom': '^16.13.1',
          },
          babel: {
            presets: ['@babel/preset-react'],
          },
        });
      }
    });
  },
};

export default reactPlugin;
