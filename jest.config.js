module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ["<rootDir>/tests/unit/setup-tests.js"],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '\\.(aes)$': '<rootDir>/jest-ignore-aes.js'
  },
  globals: {
    Uint8Array: Uint8Array,
  }
}
