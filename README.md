`layout-css` is a set of packages designed to make it simpler to validate css used
to position components, ensuring that the consumer is not modify the appearance
in an unsupportable way.

## [layout-css](packages/layout-css)

A simple library to provide lists of css properties to be used to
validate css provided to components to ensure it does not modify the
appearance of the component.

```js
import { properties } from "layout-css";
```

This version of the library uses `kabob-case`, but a `camelCase` versions
is available with the same API:

```js
import { properties } from "layout-css/camel";
```

## [layout-css-validator](packages/layout-css-validator)

A set of functions to ensure css does not include styles related to layout.
This does require parsing the CSS with stylis. If styles are parsed in a
different part of your stack, considering validating using one of the functions
in [layout-css](packages/layout-css).

## [layout-styles-validator](packages/layout-styles-validator)

A set of functions to ensure a React style objects do not include styles
related to layout.
