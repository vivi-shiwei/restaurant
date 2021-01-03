// ! 但凡用到 passport 的地方都要先 initPasport

const passport = require('passport')
const { getUserByEmailOrPhoneNum } = require('../../db/model/user')
const LocalStrategy = require('passport-local').Strategy

/* 初始化 passport */
const initPassport = () => {
  // 將 user object 變成字串
  passport.serializeUser((user, done) => {
    done(null, typeof user === 'string' ? user : JSON.stringify(user))
  })

  // 將字串變返做 obj
  passport.deserializeUser((data, done) => {
    let user = null
    // console.log('data', data)
    try {
      user = JSON.parse(data)
    } catch (err) {
      console.log(`error: ${err}`)
    }

    // 檢查有沒有 id 欄位和 created_at 欄位
    if (user && user.id && user.created_at) {
      return done(null, user)
    }

    // 沒有通過檢查就返回 null
    return done(null, null)
  })
}

/* 获取用户提交的信息 */
const initAuthentication = () => {
  /* 默认使用 username 和 password 的字段 */
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      return getUserByEmailOrPhoneNum({
        account: username,
        password
      }).then((user) => {
        done(null, user)
        return user
      }).catch((err) => {
        return done(null, err, {
          message: '请检查该账号是否存在！'
        })
      })
    }
  ))
}

module.exports = {
  init: initPassport,
  authentication: initAuthentication
}
