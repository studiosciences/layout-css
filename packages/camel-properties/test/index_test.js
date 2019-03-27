import { assert } from 'chai';
import { properties, propertiesExcluding } from '../src/index.js';
import { properties as propertiesMock } from './mocks.js';

describe.only('properties', function() {
  it('should return an array of strings', function() {
    assert.typeOf(properties, 'Array');
    properties.forEach(val => assert.typeOf(val, 'String'));
  });
  it('should expand deep children', function() {
    assert.include(properties, 'gridArea');
    assert.include(properties, 'gridColumn');
    assert.include(properties, 'gridColumnStart');
  });
  it('should expand prefixes', function() {
    assert.include(properties, 'MsGridColumnSpan');
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
    const returnValue = propertiesExcluding(['flexBasis']);
    assert.notInclude(returnValue, 'flexBasis');
    assert.notInclude(returnValue, 'flex');
    assert.include(returnValue, 'flexGrow');

    const returnValue2 = propertiesExcluding(['gridColumnStart']);
    assert.notInclude(returnValue2, 'gridColumnStart');
    assert.notInclude(returnValue2, 'gridColumn');
    assert.notInclude(returnValue2, 'gridArea');
    assert.include(returnValue2, 'gridColumnEnd');
    assert.include(returnValue2, 'gridRow');
  });
  it('should remove children', function() {
    const returnValue = propertiesExcluding(['flex']);
    assert.notInclude(returnValue, 'flexBasis');
    assert.notInclude(returnValue, 'flexGrow');
    assert.notInclude(returnValue, 'flex');

    const returnValue2 = propertiesExcluding(['gridArea']);
    assert.notInclude(returnValue2, 'gridColumnStart');
    assert.notInclude(returnValue2, 'gridColumn');
    assert.notInclude(returnValue2, 'gridRow');
    assert.notInclude(returnValue2, 'gridArea');
  });
  it('should remove prefixes', function() {
    const returnValue = propertiesExcluding(['flex']);
    assert.notInclude(returnValue, 'MsFlexPreferredSize');
    assert.notInclude(returnValue, 'flexBasis');
  });
  it('includes other prefixes', function() {
    const returnValue = propertiesExcluding(['flexShrink']);
    assert.notInclude(returnValue, 'flexShrink');
    assert.include(returnValue, 'MsFlexPreferredSize');
    assert.include(returnValue, 'flexGrow');
  });
  it("doesn't modify the model", function() {
    propertiesExcluding(['flexShrink']);
    const returnValue2 = propertiesExcluding(['flexGrow']);
    assert.include(returnValue2, 'flexShrink');
  });
});
