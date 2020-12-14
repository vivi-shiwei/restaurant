const root = require('./types/root')
const scalars = require('./types/scalar')
const user = require('./types/user')
const viewer = require('./types/viewer')

export const typeDefs = [
  root,
  scalars,
  user,
  viewer
]