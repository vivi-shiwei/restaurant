import gql from 'graphql-tag'

const Viewer = gql`
  type Viewer {
    test: Date
    id: ID!
    name: String!
    status: String!
  }

  extend type Query {
    viewer: Viewer
  }
`

module.exports = Viewer