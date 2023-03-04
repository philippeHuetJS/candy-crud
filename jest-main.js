module.exports = {
  moduleFileExtensions: [
    'js', 'ts'
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  displayName: {
    name: 'CANDY',
    color: 'blue'
  },
  rootDir: '.',
  testEnvironment: 'node',
  verbose: true,
  detectOpenHandles: true
};
