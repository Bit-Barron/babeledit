const { rules } = require('eslint-plugin-solid')

module.exports = {
  plugins: ['solid'],
  extends: [
    'eslint:recommended',
    'plugin:solid/typescript',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warning'],
    'import/no-unresolved': 'off'
  }
}
