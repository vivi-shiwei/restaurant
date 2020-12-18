import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import runMiddleware from '../../api/lib/runMiddleware'
import session from '../../api/lib/session'
import passport from 'passport'
import { init as initPassport } from '../../api/lib/initPassport'

initPassport()

const IS_PROD = process.env.NODE_ENV === 'production'
let playground = false
if (!IS_PROD) {
  playground = {
    settings: {
      'request.credentials': 'include'
    }
  }
}

const apolloServer = new ApolloServer({
  schema,
  playground,
  context: ({ req }) => {
    return {
      req,
      user: req.user,
      updateCookieUserData: data => {
        return new Promise((resolve, reject) =>
          req.login(data, err => (err ? reject(err) : resolve()))
        )
      }
    }
  },
  tracing: true
})

export const config = {
  api: {
    bodyParser: false
  }
}
const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' })

export default async (req, res) => {
  if (req.headers.session) {
    req.headers.cookie = req.headers.session
  }
  await runMiddleware(req, res, session)
  await runMiddleware(req, res, passport.initialize())
  await runMiddleware(req, res, passport.session())
  await runMiddleware(req, res, apolloHandler)
}
