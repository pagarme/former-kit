module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!stories/**",
    "!node_modules/**",
    "!coverage/**",
    "!script/**",
    "!src/**/*.test.js",
    "!.storybook/**",
    "!config/**",
    "!.circleci/**",
    "!.github/**",
    "!public/**",
    "!dist/**"
  ],
  coverageReportes: ["json", "lcov", "text"],
  setupFiles: [
    "<rootDir>/config/jest/canvas.js",
    "<rootDir>/config/jest/enzyme.js",
    "<rootDir>/config/polyfills.js"
  ],
  testMatch: [
    "<rootDir>/src/**/?(*.)(spec|test).js?(x)",
    "<rootDir>/stories/storyshots.test.js"
  ],
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ]
};