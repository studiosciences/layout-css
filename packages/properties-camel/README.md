# layout-css

A simple library to validate css only include properties related to layout. This contains three pieces which can be used separately, depending on your use case.

## validate

This validator will parse

```es
import validateLayoutCSS from "layout-css/validate";

function updateCSS(css) {
  validateLayoutCSS(css);
}

function updateCSSNoWidth(css) {
  validateLayoutCSS(css, { exclude: ["width", "min-width", "max-width"] });
}
```

## Layout Properties

If you are using another parser, you may wish to access the lists of layout
properties directly to write your own plugin. This simply includes an array
of properties used for layout.

```es
import layoutCSSProps from 'layout-css/props';
import layoutCSSPropsCamel from 'layout-css/propsCamel';

function validateStyles(styles) {
  styles.map(key => if(layoutCSSProps.includes(key) || layoutCSSPropsCamel.includes(key)) {
      throw new Error(`Invalid css property found: ${key}`);
    });
}
```
