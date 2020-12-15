
const { db: knex } = require('../knex')

const getUserByEmailOrPhoneNum = (args = {}) => {
  const {
    account,
    password
  } = args

  return knex('users')
    .where(builder => {
      builder
        .where({ email: account })
        .orWhere({ phone_number: account })
    })
    .then(rows => rows.length ? rows[0] : null)
}
module.exports = {
  getUserByEmailOrPhoneNum
}
