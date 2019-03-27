import { getTaggedTemplateLiteralContent } from './utils/taggedTemplateLiteral';
import { findInvalidLayoutProperties } from '@layout-css/validator';

const isRestyledComponent = (node, exceptions = []) =>
  node.tag.type === 'CallExpression' &&
  node.tag.callee.name === 'styled' &&
  node.tag.arguments[0].type === 'Identifier' &&
  exceptions.indexOf(node.tag.arguments[0].name) === -1;

module.exports = {
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (isRestyledComponent(node, context.options)) {
          const content = getTaggedTemplateLiteralContent(node);
          const invalidProperties = findInvalidLayoutProperties(content);

          if (invalidProperties.length) {
            context.report({
              node: node,
              //  loc: target.node.loc,
              message: `styled-component template contains css that modifies appearance: ${invalidProperties.join(
                ', '
              )} .`,
              //  data: target,
            });
          }
        }
      },
    };
  },
};
