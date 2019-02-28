const fs = require('fs')
const path = require('path')
const webpackConfig = require('./webpack.config.storybook')

webpackConfig.module.rules.unshift({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
})

const getComponentPathLine = (pathname) => {
  const name = path.basename(pathname, '.js')
  const foldername = path.basename(path.dirname(pathname))

  if (name === 'index') {
    return `import { ${foldername} } from 'former-kit'`
  }

  return `import { ${name} } from 'former-kit'`
}

const getExampleFilename = (pathname) => {
  const examplefilename = pathname.replace(/\.js$/, '.md')
  return fs.existsSync(examplefilename) ? examplefilename : path.resolve(__dirname, './empty.md')
}

module.exports = {
  title: 'FormerKit',
  pagePerSection: true,
  styleguideDir: path.resolve(__dirname, '../docs'),
  sections: [
    {
      name: 'Introduction',
      content: '../README.md',
    },
    {
      name: 'Components',
      exampleMode: 'collapse',
      usageMode: 'collapse',
      components: [
        '../src/Alert/index.js',
        '../src/Avatar/index.js',
        '../src/BulletSteps/index.js',
        '../src/Button/index.js',
        '../src/Calendar/index.js',
        '../src/CalendarInput/index.js',
        '../src/Card/Card.js',
        '../src/Card/CardActions.js',
        '../src/Card/CardContent.js',
        '../src/Card/CardGraphic.js',
        '../src/Card/CardSection.js',
        '../src/Card/CardSectionDoubleLineTitle.js',
        '../src/Card/CardTitle.js',
        '../src/Checkbox/Checkbox.js',
        '../src/CheckboxGroup/index.js',
        '../src/DateInput/index.js',
        '../src/DateSelector/index.js',
        '../src/Dropdown/Dropdown.js',
        '../src/Flexbox/index.js',
        '../src/Footer/index.js',
        '../src/Grid/Grid.js', // here the grid must appear before, row and col
        '../src/Grid/Row.js',
        '../src/Grid/Col.js',
        '../src/Header/Header.js',
        '../src/Header/HeaderBackButton.js',
        '../src/Header/HeaderContent.js',
        '../src/Header/HeaderLink.js',
        '../src/Header/HeaderMenu.js',
        '../src/Header/HeaderTitle.js',
        '../src/Image/index.js',
        '../src/Input/Input.js',
        '../src/Layout/index.js',
        '../src/Legend/index.js',
        '../src/LinearProgress/index.js',
        '../src/Modal/Modal.js',
        '../src/Modal/ModalActions.js',
        '../src/Modal/ModalContent.js',
        '../src/Modal/ModalTitle.js',
        '../src/Pagination/index.js',
        '../src/Popover/Popover.js',
        '../src/Popover/PopoverContent.js',
        '../src/Popover/PopoverMenu.js',
        '../src/RadioGroup/index.js',
        '../src/SegmentedSwitch/SegmentedSwitch.js',
        '../src/Sidebar/Sidebar.js',
        '../src/Sidebar/SidebarContent.js',
        '../src/Sidebar/SidebarHeader.js',
        '../src/Sidebar/SidebarLink.js',
        '../src/Sidebar/SidebarLinks.js',
        '../src/Spacing/index.js',
        '../src/Steps/index.js',
        '../src/Switch/index.js',
        '../src/TabBar/TabBar.js',
        '../src/TabBar/TabItem.js',
        '../src/Table/index.js',
        '../src/Table/TableAggregationRow.js',
        '../src/Table/TableEmptyItem.js',
        '../src/Table/TableEmptyRow.js',
        '../src/Table/TableExpandedItem.js',
        '../src/Table/TableExpandedRow.js',
        '../src/Table/TableHead.js',
        '../src/Table/TableRow.js',
        '../src/Tag/index.js',
        '../src/Tooltip/index.js',
        '../src/Transition/Transition.js',
        '../src/Typeset/index.js',
      ],
    },
  ],
  skipComponentsWithoutExample: true,
  getComponentPathLine,
  getExampleFilename,
  styleguideComponents: {
    Logo: path.join(__dirname, '../styleguide/components/Logo.js'),
    Wrapper: path.join(__dirname, '../styleguide/components/Wrapper.js'),
    SectionsRenderer: path.join(__dirname, '../styleguide/components/Sections.js'),
    SectionRenderer: path.join(__dirname, '../styleguide/components/Section.js'),
    'slots/IsolateButton': path.join(__dirname, '../styleguide/components/IsolateButton.js'),
  },
  theme: {
    color: {
      link: '#757575',
      linkHover: '#37cc9a',
      baseBackground: '#fff',
      border: '#e2e4e6',
      sidebarBackground: '#f6f6f5',
    },
    fontFamily: {
      base: '"Open Sans", sans-serif',
    },
  },
  webpackConfig,
}
