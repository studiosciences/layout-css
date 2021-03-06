/**
 * Borrowed from @mxstr and friends.
 * https://github.com/styled-components/stylelint-processor-styled-components
 */

import ParseError from './ParseError';
import {
  reverseString,
  nextNonWhitespaceChar,
  isLastDeclarationCompleted,
  extrapolateShortenedCommand,
} from './general';

/**
 * Check if a node is a tagged template literal
 */
const isTaggedTemplateLiteral = node =>
  node.type === 'TaggedTemplateExpression';

/**
 * Check if a tagged template literal has interpolations
 */
const hasInterpolations = node => !node.quasi.quasis[0].tail;

/**
 * Retrieves all the starting and ending comments of a TTL expression
 */
const retrieveStartEndComments = expression =>
  (expression.leadingComments || []).concat(expression.trailingComments || []);

/**
 * Checks if given comment value is an interpolation tag
 */
const isScTag = comment => /^\s*?sc-[a-z]/.test(comment);

/**
 * Checks if an interpolation has an sc comment tag
 */
const hasInterpolationTag = expression => {
  const relevantComments = retrieveStartEndComments(expression).map(
    commentObject => commentObject.value
  );
  return relevantComments.some(isScTag);
};

const extractScTagInformation = comment => {
  const matchArray = comment.match(
    /^\s*?sc-([a-z]+)\s*(?:(?:'(.*?)')|(?:"(.*?)"))?\s*$/
  );
  if (matchArray === null) {
    return null;
  }
  return {
    command: matchArray[1],
    // This is only cared about if command is custom
    customPlaceholder: matchArray[2] || matchArray[3],
  };
};

const interpolationTagAPI = [
  'block',
  'selector',
  'declaration',
  'property',
  'value',
  'custom',
];
/**
 * Enact the interpolation tagging API
 */
const parseInterpolationTag = (expression, id, absolutePath) => {
  const relevantComments = retrieveStartEndComments(expression);
  let substitute;
  relevantComments.some(comment => {
    if (isScTag(comment.value)) {
      // We always assume that there is only one sc tag in an interpolation
      const scTagInformation = extractScTagInformation(comment.value);
      if (scTagInformation === null) {
        throw new ParseError(
          'We were unable to parse your Styled Components interpolation tag, this is most likely due to lack of quotes in an sc-custom tag, refer to the documentation for correct format',
          comment.loc.start.line,
          comment.loc.start.column,
          undefined,
          absolutePath
        );
      }
      scTagInformation.command = extrapolateShortenedCommand(
        interpolationTagAPI,
        scTagInformation.command,
        absolutePath,
        comment.loc.start
      );
      switch (scTagInformation.command) {
        case 'selector':
          substitute = `.sc-selector${id}`;
          break;

        case 'block':
        case 'declaration':
          substitute = `margin: dummyValue;`; //give the benefit of the doubt
          break;

        case 'property':
          substitute = `margin`; //give the benefit of the doubt
          break;

        case 'value':
          substitute = '$dummyValue';
          break;

        case 'custom':
          substitute = scTagInformation.customPlaceholder;
          break;

        default:
          throw new ParseError(
            'You tagged a Styled Components interpolation with an invalid sc- tag. Refer to the documentation to see valid interpolation tags',
            comment.loc.start.line,
            comment.loc.start.column,
            undefined,
            absolutePath
          );
      }
      return true; // Break loop
    }
    return false; // Continue loop
  });
  return substitute;
};

/**
 * Merges the interpolations in a parsed tagged template literals with the strings
 */
const interleave = (quasis, expressions, absolutePath) => {
  // Used for making sure our dummy mixins are all unique
  let count = 0;
  let css = '';
  for (let i = 0, l = expressions.length; i < l; i += 1) {
    const prevText = quasis[i].value.raw;
    const nextText = quasis[i + 1].value.raw;
    const prevChar = nextNonWhitespaceChar(reverseString(prevText));
    const nextChar = nextNonWhitespaceChar(nextText);

    css += prevText;
    let substitute;
    if (hasInterpolationTag(expressions[i])) {
      substitute = parseInterpolationTag(expressions[i], count, absolutePath);
      count += 1;
      // No sc tag so we guess defaults
    } else if (nextChar === '{') {
      // Guess as selector, which shares format with `parseInterpolationTag`, but not `wrapSelector`
      substitute = `.sc-selector${count}`;
      count += 1;
    } else if (prevChar === ':') {
      // After a colon and not a pseudo-class, then guess as value
      substitute = '$unknownValue';
    } else if (prevChar === '-' && nextChar === ':') {
      // Before a colon, then guess as property. Give benefit of the doubt
      substitute = `unknown`;
      count += 1;
    } else if (nextChar === ':') {
      // Before a colon, then guess as property. Give benefit of the doubt
      substitute = `margin`;
      count += 1;
    } else if (isLastDeclarationCompleted(css)) {
      /** This block assumes that if you put an interpolation in the position
       * of the start of a declaration that the interpolation will
       * contain a full declaration and not later in the template literal
       * be completed by another interpolation / completed by following text
       * in the literal. Give benefit of the doubt
       */
      substitute = `margin: unknownValue`;
      count += 1;
      if (nextNonWhitespaceChar(nextText) !== ';') {
        substitute += ';';
      }
    } else {
      /* This block assumes that we are in the middle of a declaration
       * and that the interpolation is providing a value, not a property
       * or part of a property
       */
      substitute = '$unknownValue';
    }
    // Make sure substituted by same count of lines
    const targetLines =
      quasis[i + 1].loc.start.line - quasis[i].loc.end.line + 1;
    let currentLines = substitute.split('\n').length;
    while (currentLines < targetLines) {
      substitute += '\n/* dummyComment */';
      currentLines += 1;
    }

    css += substitute;
  }
  css += quasis[quasis.length - 1].value.raw;
  return css;
};

/**
 * Get the content of a tagged template literal
 *
 * TODO Cover edge cases
 */
const getTaggedTemplateLiteralContent = (node, absolutePath) => {
  if (hasInterpolations(node)) {
    return interleave(node.quasi.quasis, node.quasi.expressions, absolutePath);
  } else {
    return node.quasi.quasis[0].value.raw;
  }
};

exports.isTaggedTemplateLiteral = isTaggedTemplateLiteral;
exports.getTaggedTemplateLiteralContent = getTaggedTemplateLiteralContent;
exports.interleave = interleave;
exports.hasInterpolationTag = hasInterpolationTag;
exports.parseInterpolationTag = parseInterpolationTag;
exports.extractScTagInformation = extractScTagInformation;
