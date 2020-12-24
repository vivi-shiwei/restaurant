const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    SQLITE3_DB_FILEPATH: process.env.SQLITE3_DB_FILEPATH,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET
    // NODE_ENV: process.env.NODE_ENV
  },
  reactStrictMode: true
}
