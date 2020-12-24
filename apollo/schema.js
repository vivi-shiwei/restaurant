import { makeExecutableSchema, addSchemaLevelResolveFunction } from 'graphql-tools'
import { AuthenticationError } from 'apollo-server-micro'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

/* 每次执行graphql之前都去查询一下 currentUser */
const rootResolveFunction = async (parent, args, _context, info) => {
  if (!!info && !!info.operation && !!info.operation.__runAtMostOnce) {
    delete info.operation.__runAtMostOnce
  }

  // perform action before any other resolvers
  const { user, loaders } = _context
  _context.currentUser = null
  if (!!user && !!user.id) {
    _context.currentUser = await loaders.user.load(user.id)
    if (!_context.currentUser) {
      throw new AuthenticationError('This account has been deleted or deactivated')
    }
  }
}

addSchemaLevelResolveFunction(schema, rootResolveFunction)
