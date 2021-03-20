module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/standard', '@vue/typescript/recommended'],
  rules: {
    'object-shorthand': 'error',
    curly: 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    semi: [2, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-empty': ['error'],
    'eol-last': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 10,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
  },
  "overrides": [
      {
        "files": ["**/*.ts", "**/*.tsx"],
        "rules": {
          "camelcase": ["off"]
        }
      }
  ],
};
