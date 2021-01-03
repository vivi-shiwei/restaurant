// cookie -> session and session -> cookie
const session = require('cookie-session')
const { cookieKeygrip } = require('./cookie-utils')

const ONE_WEEK = 604800000

if (!process.env.SESSION_COOKIE_SECRET) {
  throw new Error('There must be a SESSION_COOKIE_SECRET secret key.')
}

module.exports = session({
  keys: cookieKeygrip,
  name: 'session',
  secure: process.env.NODE_ENV === 'production' && !process.env.STANDALONE,
  maxAge: ONE_WEEK,
  signed: true,
  sameSite: 'lax'
})
