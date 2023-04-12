// Enable support for ES modules
require = require('esm')(module/*, options*/)

const base = require('./jest.config.base.cjs')

module.exports = {
  ...base,
  projects:
    [
      "<rootDir>/packages/*/jest.config.cjs"
    ],
  coverageDirectory: "<rootDir>/coverage/"
}
