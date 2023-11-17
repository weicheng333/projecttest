module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'eslint:recommended'
  ],
  overrides: [
    {
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.js', '*.jsx'],
      globals: {
        __dirname: true
      }
    },
    {
      files: ['*.vue'],
      extends: [
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-recommended'
      ],
      parser: 'vue-eslint-parser',
      plugins: [
        'vue'
      ],
      rules: {
        'vue/no-v-html': 'off', // 强制每行的最大属性数
        'vue/html-self-closing': ['error', { // 自动保存时部分时没有内容的标签是否写为单标签
          html: {
            void: 'never',
            normal: 'any',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    VITE_APP_SRC: true,
    VITE_APP_ISLOCAL: true
  },
  rules: {
    // 可以覆盖已有的规则
    // off 或 0 - 关闭规则；
    // warn 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)；
    // error 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)。
    eqeqeq: 'off',
    'no-tabs': 'off', // 关闭不能有空格
    'no-new': 'off', // 关闭不能使用new
    'no-console': 'off'
  }
}
