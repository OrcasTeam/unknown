module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },

  settings: {
    'import/resolver': {
      alias: [['@', './src']]
    }
  },

  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-var': 2,
    'no-eval': 2,
    'no-console': process.env.NODE_ENV !== 'production' ? 0 : [1, { 'allow': ['warn', 'error'] }],
    'no-restricted-syntax': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    indent: [2, 2],
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    eqeqeq: [2, 'always', { 'null': 'ignore' }],
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    'prefer-rest-params': 1,
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': 0,
    'space-infix-ops': 2,
    'space-before-blocks': 2,
    'block-spacing': [2, 'always'],
    'space-before-function-paren': 0,
    'no-lonely-if': 2,

    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-this-alias': 2,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-var-requires': 2,
    '@typescript-eslint/no-inferrable-types': 2,
    'vue/require-default-prop': 0,
    'vue/eqeqeq': [2, 'always', { 'null': 'ignore' }],
    'vue/max-attributes-per-line': [0, {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
