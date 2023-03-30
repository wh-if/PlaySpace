module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "plugins": ["prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  // "plugins": [
  //   "vue",
  //   "@typescript-eslint"
  // ],
  "rules": {
    "no-debugger": "off",
    "vue/singleline-html-element-content-newline": "off"
  },
  "overrides": [
    {
      "files": ["src/**/index.vue"], // 匹配views和二级目录中的index.vue
      "rules": {
        "vue/multi-word-component-names": "off"
      } //给上面匹配的文件指定规则
    }
  ]
};
