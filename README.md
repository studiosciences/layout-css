`layout-css` is a set of packages designed to make it simpler to validate css used
to position components, ensuring that the consumer is not modify the appearance
in an unsupportable way.

## [@layout-css/properties](packages/properties)

A simple library to provide lists of css properties to be used to
validate css provided to components to ensure it does not modify the
appearance of the component.

```js
import {
  properties,
  propertiesExcluding,
  propertiesExcludingSize,
  propertiesExcludingWidth,
  propertiesExcludingHeight,
} from '@layout-css/properties';
```

## [@layout-css/properties-camel](packages/properties-camel)

A camel case version of the previous libray.

```js
import {
  properties,
  propertiesExcluding,
  propertiesExcludingSize,
  propertiesExcludingWidth,
  propertiesExcludingHeight,
} from '@layout-css/properties-camel';
```

## [@layout-css/validator](packages/validator)

A set of functions to ensure css does not include styles related to layout.
This does require parsing the CSS with stylis. If styles are parsed in a
different part of your stack, considering validating using one of the functions
in [layout-css](packages/layout-css).

## [@layout-css/eslint-plugin-styled-components](packages/eslint-plugin-styled-components)

An ESLint plugin to validate a styled-component's appearance is not modified
during composition.
