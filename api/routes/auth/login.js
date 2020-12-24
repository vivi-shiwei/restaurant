import runMiddleware from '../../lib/runMiddleware'
import session from '../../lib/session'
import passport from 'passport'
import { init as initPassport, authentication } from '../../lib/initPassport'

initPassport()
authentication()

const main = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.end(JSON.stringify({ state: false, error: err.message }))

    if (!user) return res.end(JSON.stringify({ state: false }))

    req.logIn(user, function (err) {
      if (err) res.end(JSON.stringify({ state: false, error: err.message }))

      return res.end(JSON.stringify({ state: true, user: user, env: process.env.SQLITE3_DB_FILEPATH }))
    })
  })(req, res, next)
}

export default async (req, res) => {
  await runMiddleware(req, res, session)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())
  await runMiddleware(req, res, main)
}
