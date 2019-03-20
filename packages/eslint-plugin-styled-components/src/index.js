import noModifyAppearance from './noModifyAppearance';

module.exports = {
  meta: {
    docs: {
      description:
        'Ensure components do not change the appearance of components when composing',
      category: 'css',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },
  rules: {
    'no-modify-appearance': noModifyAppearance,
  },
};
