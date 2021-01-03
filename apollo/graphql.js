import passport from 'passport'
import { ApolloServer } from 'apollo-server-micro'
import { schema } from './schema'
import runMiddleware from '../lib/api/runMiddleware'
import session from '../lib/api/session'
import { init as initPassport } from '../lib/api/initPassport'
import createLoaders from './loaders'

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
  introspection: !IS_PROD,
  playground,
  context: ({ req }) => {
    return {
      req,
      user: req.user,
      loaders: createLoaders,
      updateCookieUserData: data => {
        return new Promise((resolve, reject) =>
          req.login(data, err => (err ? reject(err) : resolve()))
        )
      }
    }
  },
  tracing: true
})

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
