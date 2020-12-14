import gql from 'graphql-tag'

const User = gql`
  type User {
    test: Date
    id: ID!
    name: String!
    status: String!
  }

  extend type Query {
    user: User
  }
`

module.exports = User