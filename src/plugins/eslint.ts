import GeneratorAPI from '../generator/generatorAPI';

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
        const eslintConfig = {
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
          rules: {
          },
        };
        api.extendPackage({
          devDependencies: {
            eslint: '^6.8.0',
            'eslint-config-airbnb-base': '^14.1.0',
            'eslint-plugin-import': '^2.20.2',
          },
        });
        api.render('.eslintrc.js', `module.exports = ${JSON.stringify(eslintConfig)}`);
      }
    });
  },
};

export default eslintPlugin;
