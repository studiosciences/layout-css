import { assert } from 'chai';
import { isValidLayout, isValidLayoutExcluding } from '../src/index.js';

describe('isValidLayout', function() {
  it('should return false', function() {
    const css = `
        flex-basis: test;
        float-not: test;
    `;
    assert.isFalse(isValidLayout(css));
  });
  it('should return false on invalid prefixes', function() {
    const css = `
        flex-basis: test;
        -ms-flex-basis: test;
    `;
    assert.isFalse(isValidLayout(css));
  });
  it('should return true', function() {
    const css = `
        '-ms-flex-preferred-size',
        flex-basis: test;
        float: test;
    `;
    assert.isTrue(isValidLayout(css));
  });
});

describe('isValidLayoutExcluding', function() {
  it('should return false on exluded prop', function() {
    const css = `
      flex-basis: test;
      float: test;
  `;
    assert.isFalse(isValidLayoutExcluding(css, ['flex-basis']));
  });
  it('should return false on prefixed versions', function() {
    const css = `
     '-ms-flex-preferred-size',
      float: test;
  `;
    assert.isFalse(isValidLayoutExcluding(css, ['flex-basis']));
  });
  it('should return true', function() {
    const css = `
     '-ms-flex-preferred-size',
      flex-basis: test;
      float: test;
  `;
    assert.isTrue(isValidLayoutExcluding(css, ['flex-grow']));
  });
});
