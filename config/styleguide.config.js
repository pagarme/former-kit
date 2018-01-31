const path = require('path')
const webpackConfig = require('./webpack.config.storybook')

webpackConfig.module.rules.unshift({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
})

module.exports = {
  components: '../src/**/*.js',
  ignore: [
    '*.test.js',
    '**/*.test.js',
    '**/tests/*.js',
    '**/tests/**/*.js',
  ],
  webpackConfig,
  styleguideComponents: {
    Wrapper: path.join(__dirname, './styleguide.js'),
  },
  skipComponentsWithoutExample: true,
}
