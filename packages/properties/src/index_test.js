import { assert } from 'chai';
import properties, { propertiesExcluding } from './index.js';
import { properties as propertiesMock } from './mocks.js';

describe('properties', function() {
  it('should return an array of strings', function() {
    assert.typeOf(properties, 'Array');
    properties.forEach(val => assert.typeOf(val, 'String'));
  });
  it('should expand deep children', function() {
    assert.include(properties, 'grid-area');
    assert.include(properties, 'grid-column');
    assert.include(properties, 'grid-column-start');
  });
  it('should expand prefixes', function() {
    assert.include(properties, '-ms-grid-column-span');
  });
  it('should match full property list', function() {
    assert.deepEqual(properties, propertiesMock);
  });
});

describe('propertiesExcluding', function() {
  it('should remove values', function() {
    assert.notInclude(propertiesExcluding(['position']), 'position');
  });
  it('should remove parent properties', function() {
    const returnValue = propertiesExcluding(['flex-basis']);
    assert.notInclude(returnValue, 'flex-basis');
    assert.notInclude(returnValue, 'flex');
    assert.include(returnValue, 'flex-grow');

    const returnValue2 = propertiesExcluding(['grid-column-start']);
    assert.notInclude(returnValue2, 'grid-column-start');
    assert.notInclude(returnValue2, 'grid-column');
    assert.notInclude(returnValue2, 'grid-area');
    assert.include(returnValue2, 'grid-column-end');
    assert.include(returnValue2, 'grid-row');
  });
  it('should remove children', function() {
    const returnValue = propertiesExcluding(['flex']);
    assert.notInclude(returnValue, 'flex-basis');
    assert.notInclude(returnValue, 'flex-grow');
    assert.notInclude(returnValue, 'flex');

    const returnValue2 = propertiesExcluding(['grid-area']);
    assert.notInclude(returnValue2, 'grid-column-start');
    assert.notInclude(returnValue2, 'grid-column');
    assert.notInclude(returnValue2, 'grid-row');
    assert.notInclude(returnValue2, 'grid-area');
  });
  it('should remove prefixes', function() {
    const returnValue = propertiesExcluding(['flex']);
    assert.notInclude(returnValue, '-ms-flex-preferred-size');
    assert.notInclude(returnValue, 'flex-basis');
  });
  it('includes other prefixes', function() {
    const returnValue = propertiesExcluding(['flex-shrink']);
    assert.notInclude(returnValue, 'flex-shrink');
    assert.include(returnValue, '-ms-flex-preferred-size');
    assert.include(returnValue, 'flex-grow');
  });
  it("doesn't modify the model", function() {
    propertiesExcluding(['flex-shrink']);
    const returnValue2 = propertiesExcluding(['flex-grow']);
    assert.include(returnValue2, 'flex-shrink');
  });
});
