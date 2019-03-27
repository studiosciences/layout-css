<a name="module_@layout-css/properties"></a>

## @layout-css/properties
A simple library to provide lists of css properties applicable
to layout. Components can use this to ensure consumers do not modify the
appearance and adhere to supportable API.
```js
import { properties } from '@layout-css/properties'
```
This version of the library uses `kabob-case`, but a `camelCase` version
is available with the same API:
```js
import properties from 'layout-css/camel-properties'
```


* [@layout-css/properties](#module_@layout-css/properties)
    * [.properties](#module_@layout-css/properties.properties) : <code>array</code>
    * [.propertiesExcluding](#module_@layout-css/properties.propertiesExcluding) ⇒ <code>array</code>
    * [.propertiesExcludingWidth](#module_@layout-css/properties.propertiesExcludingWidth) : <code>array</code>
    * [.propertiesExcludingHeight](#module_@layout-css/properties.propertiesExcludingHeight) : <code>array</code>
    * [.propertiesExcludingSize](#module_@layout-css/properties.propertiesExcludingSize) : <code>array</code>

<a name="module_@layout-css/properties.properties"></a>

### @layout-css/properties.properties : <code>array</code>
An array of all css properties that can be used for layout, including vendor
prefixed versions. This is also the default export.
```js
[ 'position', 'top', 'right', 'bottom', 'left', 'float', 'margin-top', ... ]
```

**Kind**: static constant of [<code>@layout-css/properties</code>](#module_@layout-css/properties)  
<a name="module_@layout-css/properties.propertiesExcluding"></a>

### @layout-css/properties.propertiesExcluding ⇒ <code>array</code>
This function returns a properties list filtered remove any properties a component may
not support, such as width. Any properties not matching are ignored.

This will also exclude any related shorthand,
longhand and prefixed properties. For instance, excluding flex-basis will
also exclude flex, since flex includes flex-basis. Excluding flex, will also
remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
versions.

This function is memoized to minimize workload, given this function may be
called many times with the same parameters.

Example:
```js
import { propertiesExcluding } from '@layout-css/properties'

const myProps = propertiesExcluding(['width', 'min-width', 'max-width']);
```

**Kind**: static constant of [<code>@layout-css/properties</code>](#module_@layout-css/properties)  
**Returns**: <code>array</code> - A filtered list of layout properties.  

| Param | Type | Description |
| --- | --- | --- |
| exclude | <code>array</code> | An array of properties to remove from the layout properties list. |

<a name="module_@layout-css/properties.propertiesExcludingWidth"></a>

### @layout-css/properties.propertiesExcludingWidth : <code>array</code>
This is a shortcut to remove the `width`, `min-width` and `max-width` properties.
This is useful for components that have a fixed width. `flex-basis` is not
removed since it could be used for height or width.

 Example:
```js
import { propertiesExcludingWidth } from '@layout-css/properties'
```

**Kind**: static constant of [<code>@layout-css/properties</code>](#module_@layout-css/properties)  
<a name="module_@layout-css/properties.propertiesExcludingHeight"></a>

### @layout-css/properties.propertiesExcludingHeight : <code>array</code>
This is a shortcut to remove the `height`, `min-height` and `max-height` properties.
This is useful for components that have a fixed height. `flex-basis` is not
removed since it could be used for height or width.

```js
import { propertiesExcludingHeight } from '@layout-css/properties'
```

**Kind**: static constant of [<code>@layout-css/properties</code>](#module_@layout-css/properties)  
<a name="module_@layout-css/properties.propertiesExcludingSize"></a>

### @layout-css/properties.propertiesExcludingSize : <code>array</code>
This is a shortcut to remove the flex-basis, height, width and related properties.
This is useful for components that have a fixed size.

```js
import { propertiesExcludingSize } from '@layout-css/properties'
```

**Kind**: static constant of [<code>@layout-css/properties</code>](#module_@layout-css/properties)  
