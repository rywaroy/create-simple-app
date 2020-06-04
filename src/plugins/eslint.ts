import GeneratorAPI from '../generator/generatorAPI';
import { IEslintConfig } from '../types';

const eslintPlugin = {
  id: 'eslint',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'eslint airbnb',
      value: 'eslint',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了eslint
      if (module.includes('eslint')) {
        const eslintConfig: IEslintConfig = {
          env: {
            browser: true,
            es6: true,
            node: true,
            commonjs: true,
          },
          extends: [
            'airbnb-base',
          ],
          globals: {
            Atomics: 'readonly',
            SharedArrayBuffer: 'readonly',
          },
          parserOptions: {
            ecmaVersion: 11,
            sourceType: 'module',
          },
          plugins: [],
          rules: {},
        };
        api.extendPackage({
          devDependencies: {
            eslint: '^6.8.0',
            'eslint-config-airbnb-base': '^14.1.0',
            'eslint-plugin-import': '^2.20.2',
          },
        });
        if (module.includes('typescript')) {
          eslintConfig.parser = '@typescript-eslint/parser';
          eslintConfig.plugins.push('@typescript-eslint');
          api.extendPackage({
            devDependencies: {
              '@typescript-eslint/eslint-plugin': '^3.1.0',
              '@typescript-eslint/parser': '^3.1.0',
            },
          });
        }
        api.render('.eslintrc.js', `module.exports = ${JSON.stringify(eslintConfig)}`);
      }
    });
  },
  // @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest
};

export default eslintPlugin;
