import GeneratorAPI from '../../generator/generatorAPI';

const lintStagedPlugin = {
  id: 'lint-staged',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'lint-staged',
      value: 'lint-staged',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了lint-staged
      if (module.includes('lint-staged')) {
        const lintStaged: any = {};
        if (module.includes('stylelint')) {
          lintStaged['*.css'] = ['stylelint --fix'];
        }
        if (module.includes('prettier')) {
          lintStaged['*.js'] = ['prettier --write'];
        }
        if (module.includes('eslint')) {
          if (lintStaged['*.js']) {
            lintStaged['*.js'].push('eslint --fix');
          } else {
            lintStaged['*.js'] = ['eslint --fix'];
          }
        }
        api.extendPackage({
          devDependencies: {
            'lint-staged': '^10.2.11',
          },
          'lint-staged': lintStaged,
        });
      }
    });
  },
};

export default lintStagedPlugin;
