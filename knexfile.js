// Update with your config settings.
const environment = (process.env.NODE_ENV === 'development' ? 'development' : null)
// 引入不同的env类型
require('custom-env').env(environment)
const fs = require('fs')
const path = require('path')

/* 检测db数据库是否存在 */
let isExist = false
const filepath = path.join(__dirname, './db/sql/restaurant.db')
try {
  isExist = !(fs.accessSync(filepath))
} catch (err) {
  isExist = false
  /* 不存在 db 并且又是 seed 的话就弹出错误 */
  if (process.env.KNEX_ENV === 'seed') {
    throw new Error('error: There is no restaurant.db database')
  }
}
if (!isExist) {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database(filepath)

  db.close()
}

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.sqlite3_db_file
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.sqlite3_db_file
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      // tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
