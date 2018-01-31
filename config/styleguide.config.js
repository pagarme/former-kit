module.exports = {
  components: '../src/**/*.js',
  ignore: [
    '*.test.js',
    '**/*.test.js',
    '**/tests/*.js',
    '**/tests/**/*.js',
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
          options: {
            module: true,
          },
        },
      ],
    },
  },
}
