import merge from '../../src/utils/merge';

describe('测试merge函数', () => {
  it('字符串|数字 -- 字符串|数字 合并', () => {
    const object = { version: '0.1.0' };
    const source = { version: '1.0.0' };

    merge(object, source);
    expect(object).toEqual({ version: '1.0.0' });
  });

  it('对象 --  字符串|数字 合并', () => {
    const object = { prop: { a: 1 } };
    const source = { prop: 'props' };

    merge(object, source);
    expect(object).toEqual({ prop: { a: 1 } });
  });

  it('数组 --  字符串|数字 合并', () => {
    const object = { prop: ['props1'] };
    const source = { prop: 'props2' };

    merge(object, source);
    expect(object).toEqual({ prop: ['props1', 'props2'] });
  });

  it('字符串|数字 --  对象 合并', () => {
    const object = { prop: 'prop1' };
    const source = { prop: { prop2: 'prop2' } };

    merge(object, source);
    expect(object).toEqual({ prop: { prop2: 'prop2' } });
  });

  it('对象 --  对象 合并', () => {
    const object = { prop: { prop1: 'prop1' } };
    const source = { prop: { prop2: 'prop2' } };

    merge(object, source);
    expect(object).toEqual({ prop: { prop1: 'prop1', prop2: 'prop2' } });
  });

  it('数组 --  对象 合并', () => {
    const object = { prop: ['prop1'] };
    const source = { prop: { prop2: 'prop2' } };

    merge(object, source);
    expect(object).toEqual({ prop: ['prop1', { prop2: 'prop2' }] });
  });

  it('字符串|数字 --  数组 合并', () => {
    const object = { prop: 'prop1' };
    const source = { prop: ['prop2'] };

    merge(object, source);
    expect(object).toEqual({ prop: ['prop2', 'prop1'] });
  });

  it('对象 --  数组 合并', () => {
    const object = { prop: { prop1: 'prop1' } };
    const source = { prop: ['prop2'] };

    merge(object, source);
    expect(object).toEqual({ prop: ['prop2', { prop1: 'prop1' }] });
  });

  it('数组 --  数组 合并', () => {
    const object = { prop: ['prop1'] };
    const source = { prop: ['prop2'] };

    merge(object, source);
    expect(object).toEqual({ prop: ['prop1', 'prop2'] });
  });

  it('对象合并', () => {
    const object = {
      prop1: 'prop1',
      prop3: {
        prop4: ['prop4'],
        prop5: {
          prop6: 'prop6',
        },
        prop7: ['prop7'],
      },
    };
    const source = {
      prop2: 'prop2',
      prop3: {
        prop4: ['prop4-1'],
        prop5: 'prop5',
        prop7: 'prop7-1',
      },
    };

    merge(object, source);
    expect(object).toEqual({
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: {
        prop4: ['prop4', 'prop4-1'],
        prop5: {
          prop6: 'prop6',
        },
        prop7: ['prop7', 'prop7-1'],
      },
    });
  });
});
