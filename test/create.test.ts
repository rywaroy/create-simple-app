import path from 'path';
import fs from 'fs-extra';
import create from '../src/create';

describe('测试create方法', () => {
  afterEach(() => {
    fs.removeSync(path.join(process.cwd(), 'example'));
  });
  it('测试全配置', async () => {
    const generator = create('example', {
      module: ['babel', 'commitlint', 'css', 'eslint', 'file', 'husky', 'jest', 'lint-staged', 'prettier', 'react', 'stylelint', 'typescript', 'vue'],
    });
    await generator.create();
    const examplePath = path.join(process.cwd(), 'example');
    const pkg = fs.readJSONSync(path.join(examplePath, 'package.json'));
    expect(pkg).toHaveProperty('babel');
    expect(pkg.devDependencies).toHaveProperty('commitizen');
    expect(fs.existsSync(path.join(examplePath, 'postcss.config.js'))).toBeTruthy();
    expect(fs.existsSync(path.join(examplePath, '.eslintrc.js'))).toBeTruthy();
    expect(pkg.devDependencies).toHaveProperty('url-loader');
    expect(pkg).toHaveProperty('husky');
    expect(fs.existsSync(path.join(examplePath, 'jest.config.js'))).toBeTruthy();
    expect(pkg).toHaveProperty('lint-staged');
    expect(fs.existsSync(path.join(examplePath, '.prettierrc'))).toBeTruthy();
    expect(pkg.dependencies).toHaveProperty('react');
    expect(fs.existsSync(path.join(examplePath, '.stylelintrc'))).toBeTruthy();
    expect(fs.existsSync(path.join(examplePath, 'tsconfig.json'))).toBeTruthy();
    expect(pkg.dependencies).toHaveProperty('vue');
  });

  it('测试获取prompts方法', async () => {
    const generator = create('example', {
      module: [],
    });
    await generator.create();
    expect(generator.getPrompts()).toBeTruthy();
  });

  it('测试获取getModulePrompts方法', async () => {
    const generator = create('example', {
      module: ['babel', 'eslint', 'css', 'jest', 'husky'],
    });
    await generator.create();
    console.log(generator.getModulePrompts());
    expect(generator.getModulePrompts()).toBeTruthy();
  });
});
