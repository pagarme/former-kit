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
        '../src/Avatar/index.js',
        '../src/Button/index.js',
        '../src/CheckboxGroup/index.js',
        '../src/DateInput/index.js',
        '../src/DateSelector/index.js',
        '../src/Footer/index.js',
        '../src/Layout/index.js',
        '../src/Legend/index.js',
        '../src/LinearProgress/index.js',
        '../src/Pagination/index.js',
        '../src/RadioGroup/index.js',
        '../src/SegmentedSwitch/index.js',
        '../src/Switch/index.js',
        '../src/Tag/index.js',
        '../src/Typeset/index.js',
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
        {
          name: 'Grid',
          content: '../src/Grid/README.md',
          components: () => [
            '../src/Grid/Grid.js',
            '../src/Grid/Row.js',
            '../src/Grid/Col.js',
          ],
        },
        {
          name: 'Header',
          content: '../src/Header/README.md',
          components: () => [
            '../src/Header/Header.js',
            '../src/Header/HeaderBackButton.js',
            '../src/Header/HeaderContent.js',
            '../src/Header/HeaderLink.js',
            '../src/Header/HeaderMenu.js',
            '../src/Header/HeaderTitle.js',
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
  getComponentPathLine: (componentPath) => {
    const dirComponent = path.basename(path.dirname(componentPath))
    const componentFilePath = path.basename(componentPath, '.js')
    const componentName = componentFilePath === 'index' ? dirComponent : componentFilePath

    return `import { ${componentName} } from 'former-kit'`
  },
}
