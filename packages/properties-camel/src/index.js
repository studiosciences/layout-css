import memoize from 'lodash/memoize';
import {
  properties as propertiesKebob,
  propertiesExcluding as propertiesExcludingKebob,
  propertiesExcludingWidth as propertiesExcludingWidthKebob,
  propertiesExcludingHeight as propertiesExcludingHeightKebob,
  propertiesExcludingSize as propertiesExcludingSizeKebob,
} from '@layout-css/properties';
import { kabobToCamelCaseReducer, camelToKabobCaseReducer } from './utils.js';

/**
 * @module layout-css
 * @description A simple library to provide lists of css properties applicable
 * to layout. Components can use this to ensure consumers do not modify the
 * appearance and adhere to supportable API.
 * ```js
 * import { properties } from '@layout-css/properties-camel'
 * ```
 * This version of the library uses `camelCase`, but a `kabob-case` version
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

export const properties = propertiesKebob.reduce(kabobToCamelCaseReducer, []);
export default properties;

/**
 * This function returns a properties list filtered remove any properties a component may
 * not support, such as width. Any properties not matching are ignored.
 *
 * This will also exclude any related shorthand,
 * longhand and prefixed properties. For instance, propertiesExcluding flexBasis will
 * also exclude flex, since flex includes flexBasis. propertiesExcluding flex, will also
 * remove flexGrow, flexShrink, flexBasis and all related vender prefixed
 * versions.
 *
 * This function is memoized to minimize workload, given this function may be
 * called many times with the same parameters.
 *
 * Example:
 * ```js
 * import { propertiesExcluding } from '@layout-css/properties-camel'
 *
 * propertiesExcluding(['width', 'minWidth', 'maxWidth']);
 * ```
 *
 * @param {array} exclude - An array of properties to remove from the layout properties list.
 * @returns {array} A filtered list of layout properties.
 */
export const propertiesExcluding = memoize(
  exclude => {
    const excludeKebobCase = exclude.reduce(camelToKabobCaseReducer, []);
    const kebobArray = propertiesExcludingKebob(excludeKebobCase);
    return kebobArray.reduce(kabobToCamelCaseReducer, []);
  },
  exclude => exclude.toString(exclude)
);
/**
 * This is a shortcut to remove the `width`, `minWidth` and `maxWidth` properties.
 * This is useful for components that have a fixed width. `flexBasis` is not
 * removed since it could be used for height or width.
 *
 * ```js
 * import { propertiesExcludingWidth } from '@layout-css/properties-camel'
 * ```
 *
 * @constant {array}
 */
export const propertiesExcludingWidth = propertiesExcludingWidthKebob.reduce(
  kabobToCamelCaseReducer
);
/**
 * This is a shortcut to remove the `height`, `minHeight` and `maxHeight` properties.
 * This is useful for components that have a fixed height. `flexBasis` is not
 * removed since it could be used for height or width.
 *
 * ```js
 * import { propertiesExcludingHeight } from '@layout-css/properties-camel'
 * ```
 *
 * @constant {array}
 */
export const propertiesExcludingHeight = propertiesExcludingHeightKebob.reduce(
  kabobToCamelCaseReducer
);
/**
 * This is a shortcut to remove the flexBasis, height, width and related properties.
 * This is useful for components that have a fixed size.
 *
 * ```js
 * import { propertiesExcludingSize } from '@layout-css/properties-camel'
 * ```
 *
 * @constant {array}
 */
export const propertiesExcludingSize = propertiesExcludingSizeKebob.reduce(
  kabobToCamelCaseReducer
);
