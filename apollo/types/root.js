import { gql } from '@apollo/client'

module.exports = gql`
type Query {
  dummy: String
}
type Mutation {
  dummy: String
}
schema {
  query: Query
  mutation: Mutation
}
`