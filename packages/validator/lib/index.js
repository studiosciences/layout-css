import stylisFactory from 'stylis';
import { properties, propertiesExcluding } from '@layout-css/properties';
var stylis = new stylisFactory({
  global: false,
  cascade: false,
  keyframe: false,
  prefix: false,
  compress: false,
  preserve: true
});

function cssMatchesList(css, propertyList) {
  const appearanceProperties = [];
  const propertyRegEx = /[\w-]+/;

  const plugin = (context, content) => {
    if (context === 1) {
      const property = propertyRegEx.exec(content)[0];

      if (propertyList.indexOf(property) === -1) {
        appearanceProperties.push(content);
      }
    }
  };

  stylis.use(null)(plugin);
  stylis('', css);
  return appearanceProperties.length === 0;
}

export function isValidLayout(css) {
  return cssMatchesList(css, properties);
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
 * This function is memoized to minimize workload, given this function may be
 * called many times with the same parameters.
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
  isValidLayoutExcluding
};