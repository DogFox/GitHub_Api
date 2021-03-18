module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
        'plugin:vue/essential',
        // 'plugin:vue/recommended',
    // '@vue/standard',
    // '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
