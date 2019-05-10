# `@layout-css/eslint-plugin-styled-components`

An ESLint plugin to validate a styled-component's appearance is not modified
during composition.

The following example will error because the `Button` component should not
have its background color changed. This is likely to hover or focus states, or may break if future changes are made to the appearance
of `Button`.

```js
const MyButton = styled(Button)`
  background-color: red;
`;
```

## Install

```shell
npm install @layout-css/eslint-plugin-styled-components --save-dev;

 -- or --

yarn add @layout-css/eslint-plugin-styled-components -D;
```

## Configure ESLint

Add the plugin and rule to your ESLint config.

```js
...
    plugins: ['@layout-css/styled-components'],
    rules: {
      '@layout-css/styled-components/no-modify-appearance': 'error',
    },
...
```

Note, in the above code, you may use the full package name,
"@layout-css/eslint-plugin-styled-components", but this is shorter.

## Configuring Styleable components

You may have some unstyled components that allow the appearance to be added
later. You can disable ESLint per instance, or globally for certain component
names.

Disable per line:

```js
// esline-disable-line @layout-css/styled-components/no-modify-appearance
const Button = styled(Clickable)`
  color: ${color};
`;
```

Disable component names globally in ESLint config by adding them to the options:

```js
{
    "rules": {
        "@layout-css/styled-components/no-modify-appearance": ["error", "Clickable", "Container"]
    }
}
```

## Limitations

There are ambiguous cases where the linter may not understand which templates
create valid or invalid css.

```jsx
/* Not able to identify as valid. */
const MyButton = styled(Button)`
  margin-${props => props.align}: 50px;
`;

/* Not able to identify as invalid. */
const MyButton = styled(Button)`
  ${props => props.fillProp}: $color;
`;
```

## Contributors

Based on work from https://github.com/styled-components/stylelint-processor-styled-components

## License

Licensed under the MIT License, Copyright © 2019 Marc Robichaud. See [LICENSE.md](./LICENSE.md) for more information.
