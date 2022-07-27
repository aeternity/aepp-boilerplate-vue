module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["vue"],

  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: "module",
  },
  rules: {},
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
}
