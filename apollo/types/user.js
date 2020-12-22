import gql from 'graphql-tag'

const User = gql`
  type User {
    id: ID!
    seq_id: Int
    name: String
    birthday: String
    gender: String
    email: String
    phone_number: String
    password: String
    profile_photo: String
    is_staff: Boolean
    is_admin: Boolean
    created_at: Date
    modified_at: Date
    deleted_at: Date
  }

  extend type Query {
    currentUser: User
  }
`

module.exports = User
