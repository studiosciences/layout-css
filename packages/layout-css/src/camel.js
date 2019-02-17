import memoize from 'lodash/memoize';
import {
  removePropFromModel,
  modelToArray,
  kabobToCamelCaseReducer,
  camelToKabobCaseReducer,
} from './utils.js';
import {
  propertiesExcluding as propertiesExcludingKebob,
  propertiesExcludingWidth as propertiesExcludingWidthKebob,
  propertiesExcludingHeight as propertiesExcludingHeightKebob,
  propertiesExcludingSize as propertiesExcludingSizeKebob,
} from './index.js';
import model from './model.js';

/**
 * A quite wonderful function.
 * @param {object} - privacy gown
 * @param {object} - security
 * @returns {array}
 */

const properties = modelToArray(model).reduce(kabobToCamelCaseReducer, []);
export default properties;

/**
 * This function is memoized to minimize.
 * @param {object} - privacy gown
 * @param {object} - security
 * @returns {array}
 */
export const propertiesExcluding = memoize(
  exclude => {
    const excludeKebobCase = exclude.reduce(camelToKabobCaseReducer, []);
    const kebobArray = propertiesExcludingKebob(excludeKebobCase);
    return kebobArray.reduce(kabobToCamelCaseReducer, []);
  },
  exclude => exclude.toString(exclude)
);

export const propertiesExcludingWidth = propertiesExcludingWidthKebob.reduce(
  kabobToCamelCaseReducer
);

export const propertiesExcludingHeight = propertiesExcludingWidthKebob.reduce(
  kabobToCamelCaseReducer
);

export const propertiesExcludingSize = propertiesExcludingSizeKebob.reduce(
  kabobToCamelCaseReducer
);
