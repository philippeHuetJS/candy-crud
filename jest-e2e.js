const main = require('./jest-main');

module.exports = {
  ...main,
  testRegex: '.*\\.e2e-spec\\.ts$'
};
