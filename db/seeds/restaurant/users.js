const _ = require('lodash')
const generateUUID = require('../data/uuid')
const { generateAdminUsers } = require('../data/admin/users')
const { generatePersonnelUsers } = require('../data/self-restaurant/user')

const uuid = generateUUID('10000000', 0)

module.exports = async (knex, ctx) => {
  // 資料庫操作
  const users = [
    ...generateAdminUsers(uuid),
    ...generatePersonnelUsers(uuid)
  ]

  const data = [...users]

  while (data.length) {
    console.log('add users data.length', data.length)

    const dataSplice = data.splice(0, 500)
    await knex('users').insert([...dataSplice])
  }

  const docs = [...users]
  ctx.users = {
    docs,
    obj: _.keyBy(docs, (o) => o.id)
  }
}
