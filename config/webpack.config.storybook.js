const eslintFormatter = require('react-dev-utils/eslintFormatter')
const stylelintFormatter = require('./stylelintFormatter')
const postcssUrlRebase = require('./postcssUrlRebase')
const paths = require('./paths')

const postCSSPlugins = [
  require('postcss-sass-each'),
  require('postcss-hexrgba'),
  require('postcss-import'),
  require('postcss-url')({
    url: postcssUrlRebase,
  }),
]

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.css$/,
        exclude: /react-dates/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('postcss-loader'),
            options: {
              formatter: stylelintFormatter,
              plugins: () => [
                require('stylelint'),
                ...postCSSPlugins,
                require('postcss-cssnext')({
                  features: {
                    customProperties: {
                      strict: false,
                    },
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /.*\.css$/,
        exclude: /react-dates/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: 1,
              localIdentName: '[path]-[name]-[local]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                ...postCSSPlugins,
                require('postcss-cssnext')({
                  // We don't transpile CSS variables module in Storybook
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        // This block matches only react-dates styles and extract them
        // separately, in a pipeline without CSS modules, as react-dates
        // uses global CSS. This is the place where all global CSS libraries
        // should be matched. Be sure to also edit the exclude regex from
        // previous test.
        test: /.*react-dates.*\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                ...postCSSPlugins,
                require('postcss-cssnext')({
                  // We don't transpile CSS variables module in Storybook
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: require.resolve('svgr/webpack'),
        options: {
          replaceAttrValues: [
            ['#000', 'currentColor'],
            ['#000000;', 'currentColor'],
          ]
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
}
