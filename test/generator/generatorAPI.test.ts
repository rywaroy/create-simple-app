import fs from 'fs-extra';
import path from 'path';
import Generator from '../../src/generator';
import GeneratorAPI from '../../src/generator/generatorAPI';

describe('测试GeneratorAPI类', () => {
  it('GeneratorAPI addPresetPrompt 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.addPresetPrompt({
          name: 'test',
          message: 'test',
          type: 'test',
        }, () => {});
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
    expect(generator.presetPrompts.length).toBe(1);
    expect(generator.promptCallBacks.length).toBe(1);
  });

  it('GeneratorAPI addPresetPrompt 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.addPresetPrompt({
          name: 'test',
          message: 'test',
          type: 'test',
        });
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
    expect(generator.presetPrompts.length).toBe(1);
  });

  it('GeneratorAPI addPresetPromptCallBack 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.addPresetPromptCallBack(() => {});
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
    expect(generator.promptCallBacks.length).toBe(1);
  });

  it('GeneratorAPI addPresetPromptCallBack 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.addModulePrompt({
          name: 'test',
          value: 'test',
        });
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
    expect(generator.modulePrompts.length).toBe(1);
  });

  it('GeneratorAPI hasPlugin 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        expect(api.hasPlugin('plugin')).toBeTruthy();
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
  });

  it('GeneratorAPI chainWebpack 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        expect(api.chainWebpack()).toBeTruthy();
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
  });

  it('GeneratorAPI extendPackage 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.extendPackage({ test: 'test' });
      },
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
    expect(generator.pkg).toEqual({ test: 'test' });
  });
});

describe('测试GeneratorAPI类 文件操作', () => {
  const examplePath = path.join(__dirname, 'exmaple');
  const contextPath = path.join(__dirname, 'context');
  beforeAll(() => {
    fs.mkdirSync(examplePath);
    fs.writeFileSync(path.join(examplePath, 'example.js'), 'console.log("test")');
  });

  afterAll(() => {
    fs.removeSync(examplePath);
    fs.removeSync(contextPath);
  });

  it('GeneratorAPI copy 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.copy(examplePath);
      },
    };
    const generator = new Generator(contextPath, {
      plugins: [plugin],
      pkg: {},
    });
    expect(fs.existsSync(path.join(contextPath, 'example.js'))).toBeTruthy();
  });

  it('GeneratorAPI render 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: (api: GeneratorAPI) => {
        api.render('render.js', 'console.log("render")');
        api.render('render.json', {});
      },
    };
    const generator = new Generator(contextPath, {
      plugins: [plugin],
      pkg: {},
    });
    expect(fs.existsSync(path.join(contextPath, 'render.js'))).toBeTruthy();
    expect(fs.existsSync(path.join(contextPath, 'render.json'))).toBeTruthy();
  });
});
