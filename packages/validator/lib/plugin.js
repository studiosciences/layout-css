"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertiesExcludingSize = exports.propertiesExcludingHeight = exports.propertiesExcludingWidth = exports.propertiesExcluding = exports.default = exports.properties = void 0;

var _memoize = _interopRequireDefault(require("lodash/memoize"));

var _utils = require("./utils.js");

var _model = _interopRequireDefault(require("./model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module properties
 * @description A simple library to provide lists of css properties applicable
 * to layout. Components can use this to ensure consumers do not modify the
 * appearance and adhere to supportable API.
 * ```js
 * import { properties } from '@layout-css/properties'
 * ```
 * This version of the library uses `kabob-case`, but a `camelCase` version
 * is available with the same API:
 * ```js
 * import properties from 'layout-css/properties-camel'
 * ```
 */

/**
 * An array of all css properties that can be used for layout, including vendor
 * prefixed versions. This is also the default export.
 * ```js
 * [ 'position', 'top', 'right', 'bottom', 'left', 'float', 'margin-top', ... ]
 * ```
 * @constant {array}
 */
var properties = (0, _utils.modelToArray)(_model.default);
exports.properties = properties;
var _default = properties;
/**
 * This function returns a properties list filtered remove any properties a component may
 * not support, such as width. Any properties not matching are ignored.
 *
 * This will also exclude any related shorthand,
 * longhand and prefixed properties. For instance, propertiesExcluding flex-basis will
 * also exclude flex, since flex includes flex-basis. propertiesExcluding flex, will also
 * remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
 * versions.
 *
 * This function is memoized to minimize workload, given this function may be
 * called many times with the same parameters.
 *
 * Example:
 * ```js
 * import { propertiesExcluding } from '@layout-css/properties'
 *
 * const myProps = propertiesExcluding(['width', 'min-width', 'max-width']);
 * ```
 *
 * @param {array} exclude - An array of properties to remove from the layout properties list.
 * @returns {array} A filtered list of layout properties.
 */

exports.default = _default;
var propertiesExcluding = (0, _memoize.default)(function (exclude) {
  var updatedModel = _model.default;
  exclude.forEach(function (name) {
    return updatedModel = (0, _utils.removePropFromModel)(name, updatedModel);
  });
  return (0, _utils.modelToArray)(updatedModel);
}, function (exclude) {
  return exclude.toString(exclude);
});
/**
 * This is a shortcut to remove the `width`, `min-width` and `max-width` properties.
 * This is useful for components that have a fixed width. `flex-basis` is not
 * removed since it could be used for height or width.
 *
 *  Example:
 * ```js
 * import { propertiesExcludingWidth } from '@layout-css/properties'
 * ```
 *
 * @constant {array}
 */

exports.propertiesExcluding = propertiesExcluding;
var propertiesExcludingWidth = propertiesExcluding(['width', 'min-width', 'max-width']);
/**
 * This is a shortcut to remove the `height`, `min-height` and `max-height` properties.
 * This is useful for components that have a fixed height. `flex-basis` is not
 * removed since it could be used for height or width.
 *
 * ```js
 * import { propertiesExcludingHeight } from '@layout-css/properties'
 * ```
 *
 * @constant {array}
 */

exports.propertiesExcludingWidth = propertiesExcludingWidth;
var propertiesExcludingHeight = propertiesExcluding(['height', 'min-height', 'max-height']);
/**
 * This is a shortcut to remove the flex-basis, height, width and related properties.
 * This is useful for components that have a fixed size.
 *
 * ```js
 * import { propertiesExcludingSize } from '@layout-css/properties'
 * ```
 *
 * @constant {array}
 */

exports.propertiesExcludingHeight = propertiesExcludingHeight;
var propertiesExcludingSize = propertiesExcluding(['width', 'min-width', 'max-width', 'flex-basis', 'height', 'min-height', 'max-height']);
exports.propertiesExcludingSize = propertiesExcludingSize;