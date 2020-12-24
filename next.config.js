const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    SQLITE3_DB_FILEPATH: process.env.SQLITE3_DB_FILEPATH
  },
  reactStrictMode: true
}
