module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '\\.(aes)$': '<rootDir>/jest-ignore-aes.js'
  }
}
