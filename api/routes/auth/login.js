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

    if (!!user && !user.id && !user.created_at) {
      return res.end(JSON.stringify({ state: false, error: err.message }))
    }

    req.logIn(user, function (err) {
      if (err) return res.end(JSON.stringify({ state: false, error: err.message }))

      return res.end(JSON.stringify({ state: true, env: process.env.SESSION_COOKIE_SECRET }))
    })
  })(req, res, next)
}

export default async (req, res) => {
  await runMiddleware(req, res, session)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())
  await runMiddleware(req, res, main)
}
