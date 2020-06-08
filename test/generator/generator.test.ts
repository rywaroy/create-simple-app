import Generator from '../../src/generator';

describe('测试Generator类', () => {
  it('Generator hasPlugin 方法', () => {
    const plugin = {
      id: 'plugin',
      apply: () => {},
    };
    const generator = new Generator('/', {
      plugins: [plugin],
      pkg: {},
    });
    expect(generator.hasPlugin('plugin')).toBeTruthy();
  });

  it('Generator addPresetPrompt 方法', () => {
    const generator = new Generator('/', {
      plugins: [],
      pkg: {},
    });
    generator.addPresetPrompt({
      name: 'test',
      type: 'test',
      message: 'test',
    });
    expect(generator.presetPrompts.length).toBe(1);
  });

  it('Generator addPresetPromptCallBack 方法', () => {
    const generator = new Generator('/', {
      plugins: [],
      pkg: {},
    });
    generator.addPresetPromptCallBack(() => {});
    expect(generator.promptCallBacks.length).toBe(1);
  });

  it('Generator addModulePrompt 方法', () => {
    const generator = new Generator('/', {
      plugins: [],
      pkg: {},
    });
    generator.addModulePrompt({
      name: 'test',
      value: 'test',
    });
    expect(generator.modulePrompts.length).toBe(1);
  });
});
