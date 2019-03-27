import stylisFactory from 'stylis';
import { properties, propertiesExcluding } from '@layout-css/properties';

var stylis = new stylisFactory({
  global: false,
  cascade: false,
  keyframe: false,
  prefix: false,
  compress: false,
  preserve: true,
});

function findPropertiesNotInList(css, propertyList) {
  const appearanceProperties = [];
  const propertyRegEx = /[\w-]+/;

  const plugin = (context, content) => {
    if (context === 1) {
      const property = propertyRegEx.exec(content)[0];

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
 * This function extracts any css propertuy names that do not relate to external
 * layout, such as color, background or padding. This is useful for validating
 * compsing css and presenting the invalid properties in an error.
 *
 * Example:
 * ```js
 * import { findInvalidLayoutProperties } from '@layout-css/validator'
 *
 * const invalidLayoutProperties = findInvalidLayoutProperties(css);
 * ```
 *
 * @param {string} css - A block of css for validation.
 * @returns {array}.
 */

export function findInvalidLayoutProperties(css) {
  return findPropertiesNotInList(css, properties);
}

function cssMatchesList(css, propertyList) {
  return findPropertiesNotInList(css, propertyList).length === 0;
}

/**
 * This function validates that a block of css only includes layout and not
 * properties that modifies appearance.
 *
 * Example:
 * ```js
 * import { isValidLayout } from '@layout-css/validator'
 *
 * const isLayout = isValidLayoutExcluding(css, ['margin']);
 * ```
 *
 * @param {string} css - A block of css for validation.
 * @returns {boolean}.
 */

export function isValidLayout(css) {
  return cssMatchesList(css, properties);
}

/**
 * This function validates that a block of css only includes layout, excluding
 * the passed properties.
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

export function isValidLayoutExcluding(css, exclude) {
  const propertiesFiltered = propertiesExcluding(exclude);
  return cssMatchesList(css, propertiesFiltered);
}

export default {
  isValidLayout,
  isValidLayoutExcluding,
  findInvalidLayoutProperties,
};
