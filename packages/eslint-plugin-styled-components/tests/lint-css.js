var linter = require('eslint').linter
var ESLintTester = require('eslint-tester')

var eslintTester = new ESLintTester(linter)

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
}

const options = [{
  stylelint: {
    rules: {
      'color-hex-case': 'upper',
    },
  },
}]

const test = (code, testOptions) => ({
  options,
  parserOptions,
  code,
  ...testOptions,
})

eslintTester.addRuleTest('rules/lint-css', {
  valid: [
    test('const Button = styled.div`color: #FFF;`'),
  ],
  invalid: [
    test('const Button = styled.div`color: #fff;`', {
      errors: []
    }),
  ]
})
