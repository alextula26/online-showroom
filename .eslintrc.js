module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    // 'comma-dangle': ['error', 'always-multiline'],
    'react/prop-types': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': 0,
    'react/no-unused-state': 0,
    'react/static-property-placement': ['warn', 'property assignment', {
      childContextTypes: 'static getter',
      contextTypes: 'static public field',
      contextType: 'static public field',
      displayName: 'static public field',
    }],
    eslint-disable no-underscore-dangle
  },
};
