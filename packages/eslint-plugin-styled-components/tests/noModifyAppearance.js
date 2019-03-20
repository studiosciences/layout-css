'use strict';

const rule = require('../src/noModifyAppearance');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

const parserOptions = {
  ecmaVersion: 2015,
  sourceType: 'module',
};

function testValid(value, options) {
  const code = `const Button = ${value}`;

  const test = {
    code,
    parserOptions,
  };

  if (options) {
    test.options = options;
  }
  return test;
}

function testInvalid(value, message) {
  const code = `const Button = ${value}`;

  return {
    code,
    errors: [{ message }],
    parserOptions,
  };
}

ruleTester.run('no-modify-appearance', rule, {
  valid: [
    testValid('styled(Component)`margin: 50px;`'),
    testValid("styled('div')`color: #fff;`"),
    testValid('styled.div`color: #fff;`'),
    testValid('styled.div`${unknown}: 50px;`'),
    testValid('styled(Component)`${unknown}: 50px;`'),
    testValid('styled(Component)`${unknown};`'),
    testValid('styled(Component)`${unknown}; margin: 50px;`'),
    testValid('styled(Component)`margin: 50px; /* dummyComment */`'),
    testValid(
      "styled(Button)`${props => (props.align === 'right' ? 'margin-right' : 'margin-left')}: 50px;`;"
    ),
    testValid('styled(Clickable)`color: ${color};`', [
      'Clickable',
      'SimpleButton',
    ]),
  ],

  invalid: [
    testInvalid(
      'styled(Component)`color: ${color};`',
      /^styled-component template contains css that modifies appearance: color/
    ),
    testInvalid(
      'styled(Component)`font: "Helvetica"; padding: 40px;`',
      /^styled-component template contains css that modifies appearance: font, padding/
    ),
    testInvalid(
      'styled(Component)`margin-${unknown}: 50px;`',
      /^styled-component template contains css that modifies appearance: margin-unknown/
    ),
  ],
});
