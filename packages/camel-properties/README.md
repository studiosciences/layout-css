<a name="module_layout-css"></a>

## layout-css
A simple library to provide lists of css properties applicable
to layout. Components can use this to ensure consumers do not modify the
appearance and adhere to supportable API.
```js
import { properties } from '@layout-css/properties-camel'
```
This version of the library uses `camelCase`, but a `kabob-case` version
is available with the same API:
```js
import properties from 'layout-css/properties-camel'
```


* [layout-css](#module_layout-css)
    * [.properties](#module_layout-css.properties) : <code>array</code>
    * [.propertiesExcluding](#module_layout-css.propertiesExcluding) ⇒ <code>array</code>
    * [.propertiesExcludingWidth](#module_layout-css.propertiesExcludingWidth) : <code>array</code>
    * [.propertiesExcludingHeight](#module_layout-css.propertiesExcludingHeight) : <code>array</code>
    * [.propertiesExcludingSize](#module_layout-css.propertiesExcludingSize) : <code>array</code>

<a name="module_layout-css.properties"></a>

### layout-css.properties : <code>array</code>
An array of all css properties that can be used for layout, including vendor
prefixed versions. This is also the default export.
```js
[ 'position', 'top', 'right', 'bottom', 'left', 'float', 'margin-top', ... ]
```

**Kind**: static constant of [<code>layout-css</code>](#module_layout-css)  
<a name="module_layout-css.propertiesExcluding"></a>

### layout-css.propertiesExcluding ⇒ <code>array</code>
This function returns a properties list filtered remove any properties a component may
not support, such as width. Any properties not matching are ignored.

This will also exclude any related shorthand,
longhand and prefixed properties. For instance, propertiesExcluding flexBasis will
also exclude flex, since flex includes flexBasis. propertiesExcluding flex, will also
remove flexGrow, flexShrink, flexBasis and all related vender prefixed
versions.

This function is memoized to minimize workload, given this function may be
called many times with the same parameters.

Example:
```js
import { propertiesExcluding } from '@layout-css/properties-camel'

propertiesExcluding(['width', 'minWidth', 'maxWidth']);
```

**Kind**: static constant of [<code>layout-css</code>](#module_layout-css)  
**Returns**: <code>array</code> - A filtered list of layout properties.  

| Param | Type | Description |
| --- | --- | --- |
| exclude | <code>array</code> | An array of properties to remove from the layout properties list. |

<a name="module_layout-css.propertiesExcludingWidth"></a>

### layout-css.propertiesExcludingWidth : <code>array</code>
This is a shortcut to remove the `width`, `minWidth` and `maxWidth` properties.
This is useful for components that have a fixed width. `flexBasis` is not
removed since it could be used for height or width.

```js
import { propertiesExcludingWidth } from '@layout-css/properties-camel'
```

**Kind**: static constant of [<code>layout-css</code>](#module_layout-css)  
<a name="module_layout-css.propertiesExcludingHeight"></a>

### layout-css.propertiesExcludingHeight : <code>array</code>
This is a shortcut to remove the `height`, `minHeight` and `maxHeight` properties.
This is useful for components that have a fixed height. `flexBasis` is not
removed since it could be used for height or width.

```js
import { propertiesExcludingHeight } from '@layout-css/properties-camel'
```

**Kind**: static constant of [<code>layout-css</code>](#module_layout-css)  
<a name="module_layout-css.propertiesExcludingSize"></a>

### layout-css.propertiesExcludingSize : <code>array</code>
This is a shortcut to remove the flexBasis, height, width and related properties.
This is useful for components that have a fixed size.

```js
import { propertiesExcludingSize } from '@layout-css/properties-camel'
```

**Kind**: static constant of [<code>layout-css</code>](#module_layout-css)  
