const viewer = require('./queries/viewer')
const user = require('./queries/user')
const _ = require('lodash')
export const resolvers = _.merge(
  {},
  viewer,
  user
)
