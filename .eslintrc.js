module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'react/prop-types': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/prefer-stateless-function': 0,
  },
};
