import runMiddleware from '../lib/runMiddleware'
import session from '../lib/session'
import passport from 'passport'
import { init as initPassport } from '../lib/initPassport'

initPassport()

export default async (req, res) => {
  await runMiddleware(req, res, session)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())
  console.log('session:', req.user)
  return res.end(JSON.stringify(req.user))
}
