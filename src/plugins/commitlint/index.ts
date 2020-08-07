import GeneratorAPI from '../../generator/generatorAPI';

const commitlintPlugin = {
  id: 'commitlint',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'commitlint',
      value: 'commitlint',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了commitlint
      if (module.includes('commitlint')) {
        api.extendPackage({
          devDependencies: {
            '@commitlint/cli': '^9.0.1',
            '@commitlint/config-conventional': '^9.0.1',
            commitizen: '^4.1.2',
            'cz-conventional-changelog': '^3.2.0',
          },
        });
      }
    });
  },
};

export default commitlintPlugin;
