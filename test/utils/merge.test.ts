import merge from '../../src/utils/merge';

describe('测试merge函数', () => {
  it('字符串、数字合并', () => {
    const object = { version: '0.1.0' };
    const source = { version: '1.0.0' };

    merge(object, source);
    expect(object).toEqual({ version: '1.0.0' });
  });

  it('对象合并', () => {
    const object = { scripts: { test: 'jest' } };
    const source = { scripts: { dev: 'webpack' } };
    const source2 = { scripts: { dev: 'webpack-dev-server' } };

    merge(object, source);
    merge(object, source2);
    expect(object).toEqual({
      scripts: {
        test: 'jest',
        dev: 'webpack-dev-server',
      },
    });
  });
});
