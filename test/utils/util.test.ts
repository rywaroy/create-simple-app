import { isArray, isObject, isBasic } from '../../src/utils/util';

describe('测试util函数', () => {
  it('isArray', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray({})).toBeFalsy();
  });

  it('isObject', () => {
    expect(isObject([])).toBeFalsy();
    expect(isObject({})).toBeTruthy();
  });

  it('isBasic', () => {
    expect(isBasic('string')).toBeTruthy();
    expect(isBasic(1)).toBeTruthy();
    expect(isBasic(false)).toBeFalsy();
  });
});
