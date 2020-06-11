import GeneratorAPI from '../../generator/generatorAPI';
import { IEslintConfig } from '../../types';

const eslintPlugin = {
  id: 'eslint',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Eslint airbnb',
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
            'eslint-config-airbnb': '^18.1.0',
            'eslint-config-airbnb-base': '^14.1.0',
            'eslint-plugin-import': '^2.20.2',
          },
        });

        // 判断是否是react
        if (module.includes('react')) {
          eslintConfig.extends.unshift('plugin:react/recommended');
          eslintConfig.parserOptions.ecmaFeatures = { jsx: true };
          eslintConfig.plugins.push('react');
          api.extendPackage({
            devDependencies: {
              'eslint-plugin-jsx-a11y': '^6.2.3',
              'eslint-plugin-react': '^7.20.0',
              'eslint-plugin-react-hooks': '^4.0.4',
            },
          });
        }

        // 判断是否是vue
        if (module.includes('vue')) {
          eslintConfig.extends.unshift('plugin:vue/essential');
          eslintConfig.plugins.push('vue');
          api.extendPackage({
            devDependencies: {
              'eslint-plugin-vue': '^6.2.2',
            },
          });
        }

        // 判断是否是typescript
        if (module.includes('typescript')) {
          eslintConfig.parser = '@typescript-eslint/parser';
          eslintConfig.plugins.push('@typescript-eslint');
          api.extendPackage({
            devDependencies: {
              '@typescript-eslint/eslint-plugin': '^3.1.0',
              '@typescript-eslint/parser': '^3.1.0',
              typescript: '^3.9.3',
            },
          });
        }
        api.render('.eslintrc.js', `module.exports = ${JSON.stringify(eslintConfig)}`);
      }
    });
  },
};

export default eslintPlugin;
