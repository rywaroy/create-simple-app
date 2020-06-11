import path from 'path';
import GeneratorAPI from '../../generator/generatorAPI';
import { IJestConfig } from '../../types';

const jestPlugin = {
  id: 'jest',
  apply: (api: GeneratorAPI) => {
    api.addModulePrompt({
      name: 'Jest Enzyme/vue-test-utils',
      value: 'jest',
    });
    api.addPresetPromptCallBack(({ module }: { module: string[]}) => {
      // 判断是否选择了jest
      if (module.includes('jest')) {
        api.extendPackage({
          scripts: {
            test: 'jest',
          },
          devDependencies: {
            jest: '^26.0.1',
            'babel-jest': '^26.0.1',
          },
        });
        const jestConfig: IJestConfig = {
          clearMocks: true,
          coverageDirectory: 'coverage',
          transformIgnorePatterns: [
            '/node_modules/',
          ],
          moduleFileExtensions: [
            'js',
            'json',
            'jsx',
            'ts',
            'tsx',
            'node',
          ],
          testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
          transform: {
            '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
          },
          moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/src/$1',
          },
        };
        if (module.includes('react')) {
          api.extendPackage({
            devDependencies: {
              enzyme: '^3.11.0',
              'enzyme-adapter-react-16': '^1.15.2',
              'jest-enzyme': '^7.1.2',
            },
          });
          jestConfig.setupFilesAfterEnv = [
            './node_modules/jest-enzyme/lib/index.js',
            './utils/setup.js',
          ];
          api.copy(path.join(__dirname, './template'));
        }
        if (module.includes('vue')) {
          api.extendPackage({
            devDependencies: {
              'babel-core': '^6.26.3',
              '@vue/test-utils': '^1.0.3',
              'vue-jest': '^3.0.5',
            },
          });
          jestConfig.moduleFileExtensions.push('vue');
          jestConfig.transform['.*\\.(vue)$'] = 'vue-jest';
        }
        if (module.includes('typescript')) {
          api.extendPackage({
            devDependencies: {
              'ts-jest': '^26.1.0',
            },
          });
          jestConfig.transform['^.+\\.tsx?$'] = 'ts-jest';
        }
        api.render('jest.config.js', `module.exports = ${JSON.stringify(jestConfig)}`);
      }
    });
  },
};

export default jestPlugin;
