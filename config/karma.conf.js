const path = require('path');
const webpackConfig = require('./webpack.test');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
  config.set({
    basePath: path.resolve(__dirname, '..'),
    frameworks: ['mocha', 'chai'],
    files: ['src/**/*.spec.ts'],
    preprocessors: { 'src/**/*.ts': ['webpack'] },
    webpack: webpackConfig,
    webpackServer: { noInfo: true, stats: require('./webpack-stats-silent') },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadlessCustom'],
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: true,
    concurrency: 6e6,
    mime: { 'text/x-typescript': ['ts','tsx'] },
  });
};
