"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInvalidLayoutProperties = findInvalidLayoutProperties;
exports.isValidLayout = isValidLayout;
exports.isValidLayoutExcluding = isValidLayoutExcluding;
exports.default = void 0;

var _stylis = _interopRequireDefault(require("stylis"));

var _properties = require("@layout-css/properties");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylis = new _stylis.default({
  global: false,
  cascade: false,
  keyframe: false,
  prefix: false,
  compress: false,
  preserve: true
});

function findPropertiesNotInList(css, propertyList) {
  var appearanceProperties = [];
  var propertyRegEx = /[\w-]+/;

  var plugin = function plugin(context, content) {
    if (context === 1) {
      var property = propertyRegEx.exec(content)[0];

      if (propertyList.indexOf(property) === -1) {
        appearanceProperties.push(property);
      }
    }
  };

  stylis.use(null)(plugin);
  stylis('', css);
  return appearanceProperties;
}
/**
 * This function returns a properties list filtered remove any properties a component may
 * not support, such as width. Any properties not matching are ignored.
 *
 * This will also exclude any related shorthand,
 * longhand and prefixed properties. For instance, excluding flex-basis will
 * also exclude flex, since flex includes flex-basis. propertiesExcluding flex, will also
 * remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
 * versions.
 *
 * Example:
 * ```js
 * import { isValidLayoutExcluding } from '@layout-css/validator'
 *
 * const isLayout = isValidLayoutExcluding(css, ['margin']);
 * ```
 *
 * @param {string} css - A block of css for validation.
 * @returns {array}.
 */


function findInvalidLayoutProperties(css) {
  return findPropertiesNotInList(css, _properties.properties);
}

function cssMatchesList(css, propertyList) {
  return findPropertiesNotInList(css, propertyList).length === 0;
}
/**
 * This function returns a properties list filtered remove any properties a component may
 * not support, such as width. Any properties not matching are ignored.
 *
 * This will also exclude any related shorthand,
 * longhand and prefixed properties. For instance, excluding flex-basis will
 * also exclude flex, since flex includes flex-basis. propertiesExcluding flex, will also
 * remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
 * versions.
 *
 * Example:
 * ```js
 * import { isValidLayoutExcluding } from '@layout-css/validator'
 *
 * const isLayout = isValidLayoutExcluding(css, ['margin']);
 * ```
 *
 * @param {string} css - A block of css for validation.
 * @param {array} exclude - An array of properties to remove from the layout properties list.
 * @returns {boolean}.
 */


function isValidLayout(css) {
  return cssMatchesList(css, _properties.properties);
}
/**
 * This function returns a properties list filtered remove any properties a component may
 * not support, such as width. Any properties not matching are ignored.
 *
 * This will also exclude any related shorthand,
 * longhand and prefixed properties. For instance, excluding flex-basis will
 * also exclude flex, since flex includes flex-basis. propertiesExcluding flex, will also
 * remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
 * versions.
 *
 * Example:
 * ```js
 * import { isValidLayoutExcluding } from '@layout-css/validator'
 *
 * const isLayout = isValidLayoutExcluding(css, ['margin']);
 * ```
 *
 * @param {string} css - A block of css for validation.
 * @param {array} exclude - An array of properties to remove from the layout properties list.
 * @returns {boolean}.
 */


function isValidLayoutExcluding(css, exclude) {
  var propertiesFiltered = (0, _properties.propertiesExcluding)(exclude);
  return cssMatchesList(css, propertiesFiltered);
}

var _default = {
  isValidLayout: isValidLayout,
  isValidLayoutExcluding: isValidLayoutExcluding,
  findInvalidLayoutProperties: findInvalidLayoutProperties
};
exports.default = _default;