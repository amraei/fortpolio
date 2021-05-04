module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  plugins: [],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off",
    "arrow-parens": 0,
    curly: 0,
    camelcase: 0,
    "eol-last": 0,
    // allow async-await
    "generator-star-spacing": 0,
    indent: 1,
    "no-trailing-spaces": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-unneeded-ternary": 0,
    "no-unused-vars": 1,
    semi: 0,
    "space-before-blocks": 0,
    "space-before-function-paren": 0,
    quotes: 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/html-self-closing": 0,
    "vue/comment-directive": 0,
    "vue/one-component-per-file": 0,
    "vue/multiline-html-element-content-newline": 0,
    "vue/no-unused-components": 1,
    "vue/require-default-prop": 0,
    "vue/singleline-html-element-content-newline": 0
  }
};
