import memoize from 'lodash/memoize';
import { modelToArray, removePropFromModel } from './utils.js';
import model from './model.js';

/**
 * A quite wonderful function.
 * @param {object} - privacy gown
 * @param {object} - security
 * @returns {array}
 */
const properties = modelToArray(model);
export default properties;

/**
 * This function is memoized to minimize.
 * @param {object} - privacy gown
 * @param {object} - security
 * @returns {array}
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

export const propertiesExcludingWidth = propertiesExcluding([
  'width',
  'min-width',
  'max-width',
]);

export const propertiesExcludingHeight = propertiesExcluding([
  'height',
  'min-height',
  'max-height',
]);

export const propertiesExcludingSize = propertiesExcluding([
  'width',
  'min-width',
  'max-width',
  'flex-basis',
  'height',
  'min-height',
  'max-height',
]);
