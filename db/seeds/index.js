
/* 清除所有的数据库 */
const reset = require('./restaurant/reset')
/* 餐厅的管理员和用户 */
const addUsers = require('./restaurant/users')

const ctx = {}
exports.seed = async (knex) => {
  /* 执行数据库操作 */
  await reset(knex)
  console.log('> clear all db table')

  await addUsers(knex, ctx)
  console.log(`> added users: ${ctx.users.docs.length}`)
}
