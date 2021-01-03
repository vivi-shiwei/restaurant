import passport from 'passport'

import runMiddleware from '../../api/runMiddleware'
import { init as initPassport } from '../../api/initPassport'
import session from '../../api/session'

initPassport()

export default async (req, res) => {
  await runMiddleware(req, res, session)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())

  req.logout()
  return res.end(JSON.stringify({ state: true }))
}
