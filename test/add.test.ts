import path from 'path';
import fs from 'fs-extra';
import add from '../src/add';

const examplePath = path.join(process.cwd(), 'example');

beforeAll(() => {
  fs.ensureDirSync(examplePath);
  fs.writeJSONSync(path.join(examplePath, 'package.json'), {
    name: 'test',
    version: '0.1.0',
    devDependencies: {},
    dependencies: {},
  });
});

afterAll(() => {
  fs.removeSync(examplePath);
});

describe('测试add方法', () => {
  it('测试配置', async () => {
    const generator = add('example', {
      module: ['commitlint', 'eslint', 'husky', 'jest', 'lint-staged', 'prettier', 'stylelint'],
    });
    await generator!.create();
    const pkg = fs.readJSONSync(path.join(examplePath, 'package.json'));
    expect(pkg.devDependencies).toHaveProperty('commitizen');
    expect(fs.existsSync(path.join(examplePath, '.eslintrc.js'))).toBeTruthy();
    expect(pkg).toHaveProperty('husky');
    expect(fs.existsSync(path.join(examplePath, 'jest.config.js'))).toBeTruthy();
    expect(pkg).toHaveProperty('lint-staged');
    expect(fs.existsSync(path.join(examplePath, '.prettierrc'))).toBeTruthy();
    expect(fs.existsSync(path.join(examplePath, '.stylelintrc'))).toBeTruthy();
  });

  it('测试不存在文件夹', async () => {
    const generator = add('test', {
      module: [],
    });
    expect(generator).toBeNull();
  });
});
