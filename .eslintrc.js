module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Example: turn off a rule
    'prettier/prettier': 'off',

    // Example: treat specific rules as warnings
    'no-unused-vars': 'warn',
    'no-console': 'warn',

    // Example: treat specific rules as errors
    semi: ['error', 'always'],
  },
};
