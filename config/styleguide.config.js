const path = require('path')
const webpackConfig = require('./webpack.config.storybook')

webpackConfig.module.rules.unshift({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
})

module.exports = {
  getComponentPathLine: (component) => {
    const rawDirname = path.dirname(component)
    const dirname = path.basename(rawDirname)
    const rawFilename = path.basename(component, '.js')
    const nameToImport = rawFilename === 'index' ? dirname : rawFilename

    return `import { ${nameToImport} } from 'former-kit'`
  },
  title: 'FormerKit',
  pagePerSection: true,
  sections: [
    {
      name: 'Components',
      components: '../src/*/*.js',
      exampleMode: 'expand',
      usageMode: 'expand',
    },
  ],
  skipComponentsWithoutExample: true,
  styleguideDir: path.resolve(__dirname, '../docs'),
  styleguideComponents: {
    Wrapper: path.join(__dirname, './styleguide.js'),
  },
  webpackConfig,
}
