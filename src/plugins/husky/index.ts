import GeneratorAPI from '../../generator/generatorAPI';

const huskyPlugin = {
  id: 'husky',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'husky',
      value: 'husky',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了husky
      if (module.includes('husky')) {
        const huskyConfig: any = {
          hooks: {},
        };
        if (module.includes('lint-staged')) {
          huskyConfig.hooks['pre-commit'] = 'lint-staged';
        }
        if (module.includes('commintlint')) {
          huskyConfig.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
        }
        api.extendPackage({
          devDependencies: {
            husky: '^4.2.5',
          },
          husky: huskyConfig,
        });
      }
    });
  },
};

export default huskyPlugin;
