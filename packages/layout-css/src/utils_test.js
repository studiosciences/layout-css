import { assert } from 'chai';
import { camelToKabobCase, kabobToCamelCase } from './utils.js';

describe('kabobToCamelCase', function() {
  it('should convert strings', function() {
    assert.strictEqual(kabobToCamelCase('-ms-what-ever'), 'MsWhatEver');
    assert.strictEqual(kabobToCamelCase('flex-basis'), 'flexBasis');
    assert.strictEqual(kabobToCamelCase('flexbasis-'), 'flexbasis-');
  });
});

describe('camelToKabobCase', function() {
  it('should convert strings', function() {
    assert.strictEqual(camelToKabobCase('MsWhatEver'), '-ms-what-ever');
    assert.strictEqual(camelToKabobCase('flexBasis'), 'flex-basis');
  });
});
