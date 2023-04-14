module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/__tests__',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/.*.(test|spec)).(tsx?|ts?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '(tests/.*.mock).(tsx?|ts?)$',
  ],
  verbose: true,
}
