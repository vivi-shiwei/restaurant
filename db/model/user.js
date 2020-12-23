
const { db: knex } = require('../knex')
const distinguish = require('../../lib/distinguish')
const getUserByEmailOrPhoneNum = async (args = {}) => {
  const {
    account,
    password
  } = args

  return knex('users')
    .whereNull('deleted_at')
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
    .whereNull('deleted_at')
    .where({
      id: userId
    })
    .then(rows => rows.length ? rows[0] : null)
}

// 根據 id 或 seq_id 返回 users (多個)
const getUsersByIds = async (args = []) => {
  const { ids, seqId } = distinguish(args)

  return knex('users')
    .whereNull('deleted_at')
    .andWhere(builder => (
      builder.whereIn('id', ids).orWhereIn('seq_id', seqId)
    ))
}

module.exports = {
  getUserByEmailOrPhoneNum,
  getUsersByIds,
  getUserById
}
