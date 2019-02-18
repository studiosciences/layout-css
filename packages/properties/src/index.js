import memoize from 'lodash/memoize';
import { modelToArray, removePropFromModel } from './utils.js';
import model from './model.js';
/**
 * @module layout-css
 * @description A simple library to provide lists of css properties to be used to
 * validate css provided to components to ensure it does not modify the
 * appearance of the component.
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
export const properties = modelToArray(model);
export default properties;

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
 * propertiesExcluding(['width', 'min-width', 'max-width']);
 * ```
 *
 * @param {array} exclude - An array of properties to remove from the layout properties list.
 * @returns {array} A filtered list of layout properties.
 */
export const propertiesExcluding = memoize(
  exclude => {
    let updatedModel = model;
    exclude.forEach(
      name => (updatedModel = removePropFromModel(name, updatedModel))
    );
    return modelToArray(updatedModel);
  },
  exclude => exclude.toString(exclude)
);
/**
 * This is a shortcut to remove the `width`, `min-width` and `max-width` properties.
 * This is useful for components that have a fixed width. `flex-basis` is not
 * removed since it could be used for height or width.
 * @constant {array}
 */
export const propertiesExcludingWidth = propertiesExcluding([
  'width',
  'min-width',
  'max-width',
]);
/**
 * This is a shortcut to remove the `height`, `min-height` and `max-height` properties.
 * This is useful for components that have a fixed height. `flex-basis` is not
 * removed since it could be used for height or width.
 * @constant {array}
 */
export const propertiesExcludingHeight = propertiesExcluding([
  'height',
  'min-height',
  'max-height',
]);
/**
 * This is a shortcut to remove the flex-basis, height, width and related properties.
 * This is useful for components that have a fixed size.
 * @constant {array}
 */
export const propertiesExcludingSize = propertiesExcluding([
  'width',
  'min-width',
  'max-width',
  'flex-basis',
  'height',
  'min-height',
  'max-height',
]);
