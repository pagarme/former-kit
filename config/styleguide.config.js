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
      content: './empty.md',
    },
    {
      name: 'Components',
      components: () => [
        '../src/Alert/index.js',
        '../src/Avatar/index.js',
        '../src/BulletSteps/index.js',
        '../src/Button/index.js',
        '../src/Calendar/index.js',
        '../src/CalendarInput/index.js',
        '../src/Checkbox/Checkbox.js',
        '../src/CheckboxGroup/index.js',
        '../src/DateInput/index.js',
        '../src/DateSelector/index.js',
        '../src/Dropdown/Dropdown.js',
        '../src/Flexbox/index.js',
        '../src/Footer/index.js',
        '../src/Image/index.js',
        '../src/Input/Input.js',
        '../src/Layout/index.js',
        '../src/Legend/index.js',
        '../src/LinearProgress/index.js',
        '../src/Pagination/index.js',
        '../src/RadioGroup/index.js',
        '../src/SegmentedSwitch/SegmentedSwitch.js',
        '../src/Spacing/index.js',
        '../src/Steps/index.js',
        '../src/Switch/index.js',
        '../src/Tag/index.js',
        '../src/Tooltip/index.js',
        '../src/Transition/Transition.js',
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
            '../src/Card/CardSectionDoubleLineTitle.js',
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
        {
          name: 'Popover',
          content: '../src/Popover/README.md',
          components: () => [
            '../src/Popover/Popover.js',
            '../src/Popover/PopoverContent.js',
            '../src/Popover/PopoverMenu.js',
          ],
        },
        {
          name: 'Sidebar',
          content: '../src/Sidebar/README.md',
          components: () => [
            '../src/Sidebar/Sidebar.js',
            '../src/Sidebar/SidebarContent.js',
            '../src/Sidebar/SidebarHeader.js',
            '../src/Sidebar/SidebarLink.js',
            '../src/Sidebar/SidebarLinks.js',
          ],
        },
        {
          name: 'Table',
          content: '../src/Table/README.md',
          components: () => [
            '../src/Table/index.js',
          ],
        },
        {
          name: 'Modal',
          content: '../src/Modal/README.md',
          components: () => [
            '../src/Modal/Modal.js',
            '../src/Modal/ModalActions.js',
            '../src/Modal/ModalContent.js',
            '../src/Modal/ModalTitle.js',
          ],
        },
        {
          name: 'TabBar',
          content: '../src/TabBar/README.md',
          components: () => [
            '../src/TabBar/TabBar.js',
            '../src/TabBar/TabItem.js',
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
  styleguideDir: path.resolve(__dirname, '../docs'),
  webpackConfig,
  styleguideComponents: {
    Wrapper: path.join(__dirname, './styleguide.js'),
  },
  skipComponentsWithoutExample: true,
  getExampleFilename: (componentPath) => {
    const pathToMd = componentPath.replace(/\.js$/, '.md')

    if (!fs.existsSync(pathToMd)) {
      return path.resolve(__dirname, './empty.md')
    }

    return pathToMd
  },
  getComponentPathLine: (componentPath) => {
    const dirComponent = path.basename(path.dirname(componentPath))
    const componentFilePath = path.basename(componentPath, '.js')
    const componentName = componentFilePath === 'index'
      ? dirComponent
      : componentFilePath

    const formFilePath =
      `${path.resolve(__dirname, '../src', dirComponent)}/form/index.js`

    if (fs.existsSync(formFilePath)) {
      return `import { ${componentName} } from 'former-kit'
              or import { Form${componentName} } from 'former-kit'`
    }

    return `import { ${componentName} } from 'former-kit'`
  },
}
