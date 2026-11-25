export const noLiteralText = {
  meta: {
    type: 'problem',
    docs: {
      description: 'User-facing copy must come from en.json through t()',
    },
    schema: [],
    messages: {
      literal:
        'Literal text in JSX is not translated. Move it to en.json and use t().',
    },
  },
  create(context) {
    return {
      JSXText(node) {
        const value = node.value.trim();
        if (value.length > 0 && /\p{L}/u.test(value)) {
          context.report({ node, messageId: 'literal' });
        }
      },
    };
  },
};
