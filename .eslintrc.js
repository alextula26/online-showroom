module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
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
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'react/prop-types': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
};
