const stylelint = require('stylelint');

const helperMethods = ['keyframes', 'injectGlobal', 'css'];

const isHelper = node =>
  node.tag.type === 'Identifier' && helperMethods.includes(node.tag.name);

const isStyledTagname = node =>
  node.tag.type === 'MemberExpression' &&
  node.tag.object.name === 'styled' &&
  node.tag.property.type === 'Identifier';

module.exports = {
  create(context) {
    const options = context.options[0];

    return {
      TaggedTemplateExpression(node) {
        if (isStyledTagname(node)) {
          console.log(node.quasi.quasis[0].value.raw);
          // This doesn't work because this function _needs_ to return sync :(
          // stylelint.lint({
          // 	code: node.quasi.quasis[0].value.raw,
          // 	config: options.stylelint,
          // }).then().catch()
        }
      },
    };
  },
};
