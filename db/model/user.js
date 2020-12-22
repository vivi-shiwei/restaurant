
const { db: knex } = require('../knex')

const getUserByEmailOrPhoneNum = async (args = {}) => {
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
    .andWhere({
      password
    })
    .then(rows => rows.length ? rows[0] : null)
}

const getUserById = async (userId) => {
  return knex('users')
    .where({
      id: userId
    })
    .then(rows => rows.length ? rows[0] : null)
}
module.exports = {
  getUserByEmailOrPhoneNum,
  getUserById
}
