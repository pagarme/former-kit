const path = require('path')
const fs = require('fs')
const webpackConfig = require('./webpack.config.storybook')

webpackConfig.module.rules.unshift({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
})

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: '../README.md',
    },
    {
      name: 'Components',
      components: () => [
        '../src/Alert/index.js',
      ],
      sections: [
        {
          name: 'Card',
          content: '../src/Card/README.md',
          components: () => [
            '../src/Card/Card.js',
            '../src/Card/CardActions.js',
            '../src/Card/CardContent.js',
            '../src/Card/CardGraphic.js',
            '../src/Card/CardSection.js',
            '../src/Card/CardTitle.js',
          ],
        },
      ],
    },
  ],
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
  getExampleFilename: (componentpath) => {
    const pathToMd = componentpath.replace(/\.js$/, '.md')

    if (!fs.existsSync(pathToMd)) {
      return path.resolve(__dirname, './empty.md')
    }

    return pathToMd
  },
}
