import GeneratorAPI from '../../generator/generatorAPI';

const jestPlugin = {
  id: 'jest',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Jest',
      value: 'jest',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了jest
      if (module.includes('jest')) {
        api.extendPackage({
          devDependencies: {
            jest: '^26.0.1',
          },
        });
        const jestConfig = {
          clearMocks: true,
          coverageDirectory: 'coverage',
          moduleFileExtensions: [
            'js',
            'json',
            'jsx',
            'ts',
            'tsx',
            'node',
          ],
          testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
        };
        api.render('jest.config.js', `module.exports = ${JSON.stringify(jestConfig)}`);
      }
    });
  },
};

export default jestPlugin;
