"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var layoutProps = [{
  name: 'position'
}, {
  name: 'top'
}, {
  name: 'right'
}, {
  name: 'bottom'
}, {
  name: 'left'
}, {
  name: 'float'
}, {
  name: 'margin',
  children: [{
    name: 'margin-top',
    shorthand: 'margin'
  }, {
    name: 'margin-right',
    shorthand: 'margin'
  }, {
    name: 'margin-bottom',
    shorthand: 'margin'
  }, {
    name: 'margin-left',
    shorthand: 'margin'
  }]
}, {
  name: 'width'
}, {
  name: 'min-width'
}, {
  name: 'max-width'
}, {
  name: 'height'
}, {
  name: 'min-height'
}, {
  name: 'max-height'
}, {
  name: 'flex',
  prefixes: ['-webkit-box-flex', '-webkit-flex', '-moz-box-flex', '-ms-flex'],
  children: [{
    name: 'flex-basis',
    prefixes: ['-webkit-flex-basis', '-ms-flex-preferred-size']
  }, {
    name: 'flex-grow',
    prefixes: ['-webkit-flex-grow', '-ms-flex-positive']
  }, {
    name: 'flex-shrink',
    prefixes: ['-webkit-flex-shrink', '-ms-flex-negative']
  }]
}, {
  name: 'align-self',
  prefixes: ['-webkit-align-self', '-ms-grid-row-align, -ms-flex-item-align']
}, {
  name: 'order',
  prefixes: ['-webkit-box-ordinal-group', '-webkit-order', '-moz-box-ordinal-group', '-ms-flex-order']
}, {
  name: 'grid-area',
  children: [{
    name: 'grid-column',
    children: [{
      name: 'grid-column-start',
      prefixes: ['-ms-grid-column']
    }, {
      name: 'grid-column-end',
      prefixes: ['-ms-grid-column-span']
    }]
  }, {
    name: 'grid-row',
    children: [{
      name: 'grid-row-end',
      prefixes: ['-ms-grid-row-span']
    }, {
      name: 'grid-row-start',
      prefixes: ['-ms-grid-row']
    }]
  }]
}, {
  name: 'justify-self',
  prefixes: ['-ms-grid-column-align']
}, {
  name: 'place-self',
  prefixes: ['-ms-grid-column-align']
}, {
  name: 'visibility'
}];
var _default = layoutProps;
exports.default = _default;