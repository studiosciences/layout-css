## Functions

<dl>
<dt><a href="#findInvalidLayoutProperties">findInvalidLayoutProperties(css)</a> ⇒ <code>array</code></dt>
<dd><p>This function extracts any css propertuy names that do not relate to external
layout, such as color, background or padding. This is useful for validating
compsing css and presenting the invalid properties in an error.</p>
<p>Example:</p>
<pre><code class="language-javascript">import { findInvalidLayoutProperties } from &#39;@layout-css/validator&#39;

const invalidLayoutProperties = findInvalidLayoutProperties(css);
</code></pre>
</dd>
<dt><a href="#isValidLayout">isValidLayout(css)</a> ⇒ <code>boolean</code></dt>
<dd><p>This function validates that a block of css only includes layout and not
properties that modifies appearance.</p>
<p>Example:</p>
<pre><code class="language-javascript">import { isValidLayout } from &#39;@layout-css/validator&#39;

const isLayout = isValidLayoutExcluding(css, [&#39;margin&#39;]);
</code></pre>
</dd>
<dt><a href="#isValidLayoutExcluding">isValidLayoutExcluding(css, exclude)</a> ⇒ <code>boolean</code></dt>
<dd><p>This function validates that a block of css only includes layout, excluding
the passed properties.</p>
<p>This will also exclude any related shorthand,
longhand and prefixed properties. For instance, excluding flex-basis will
also exclude flex, since flex includes flex-basis. propertiesExcluding flex, will also
remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
versions.</p>
<p>Example:</p>
<pre><code class="language-javascript">import { isValidLayoutExcluding } from &#39;@layout-css/validator&#39;

const isLayout = isValidLayoutExcluding(css, [&#39;margin&#39;]);
</code></pre>
</dd>
</dl>

<a name="findInvalidLayoutProperties"></a>

## findInvalidLayoutProperties(css) ⇒ <code>array</code>
This function extracts any css propertuy names that do not relate to external
layout, such as color, background or padding. This is useful for validating
compsing css and presenting the invalid properties in an error.

Example:
```js
import { findInvalidLayoutProperties } from '@layout-css/validator'

const invalidLayoutProperties = findInvalidLayoutProperties(css);
```

**Kind**: global function  
**Returns**: <code>array</code> - .  

| Param | Type | Description |
| --- | --- | --- |
| css | <code>string</code> | A block of css for validation. |

<a name="isValidLayout"></a>

## isValidLayout(css) ⇒ <code>boolean</code>
This function validates that a block of css only includes layout and not
properties that modifies appearance.

Example:
```js
import { isValidLayout } from '@layout-css/validator'

const isLayout = isValidLayoutExcluding(css, ['margin']);
```

**Kind**: global function  
**Returns**: <code>boolean</code> - .  

| Param | Type | Description |
| --- | --- | --- |
| css | <code>string</code> | A block of css for validation. |

<a name="isValidLayoutExcluding"></a>

## isValidLayoutExcluding(css, exclude) ⇒ <code>boolean</code>
This function validates that a block of css only includes layout, excluding
the passed properties.

This will also exclude any related shorthand,
longhand and prefixed properties. For instance, excluding flex-basis will
also exclude flex, since flex includes flex-basis. propertiesExcluding flex, will also
remove flex-grow, flex-shrink, flex-basis and all related vender prefixed
versions.

Example:
```js
import { isValidLayoutExcluding } from '@layout-css/validator'

const isLayout = isValidLayoutExcluding(css, ['margin']);
```

**Kind**: global function  
**Returns**: <code>boolean</code> - .  

| Param | Type | Description |
| --- | --- | --- |
| css | <code>string</code> | A block of css for validation. |
| exclude | <code>array</code> | An array of properties to remove from the layout properties list. |

