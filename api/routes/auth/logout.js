import passport from 'passport'

import runMiddleware from '../../lib/runMiddleware'
import { init as initPassport } from '../../lib/initPassport'
import session from '../../lib/session'

initPassport()

export default async (req, res) => {
  await runMiddleware(req, res, session)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())

  req.logout()
  return res.end(JSON.stringify({ state: true }))
}
