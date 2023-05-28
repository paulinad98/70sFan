module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'vue/multi-word-component-names': 'off',
    'no-use-before-define': 'off',
  },
};
