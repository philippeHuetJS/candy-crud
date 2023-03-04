const main = require('./jest-main');

module.exports = {
  ...main,
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: [
    'src/**/*.(t|j)s'
  ],
  coveragePathIgnorePatterns: [
    'coverage',
    'dist',
    'node_modules',
    'types'
  ],
  coverageDirectory: 'coverage'
};
