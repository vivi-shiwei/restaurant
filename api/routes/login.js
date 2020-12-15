const { getUserByEmailOrPhoneNum } = require('../../db/model/user')

export default async (req, res) => {
  console.log(req.body)
  const user = await getUserByEmailOrPhoneNum({
    account: 'rainwildest@163.com',
    password: null
  })
  console.log(req.headers.host)
  // 没有找到该用户
  if (!user) {
    console.log('not find')
    res.redirect('/')
    return res.end()
  }

  // console.log(user)
  res.end(`login:${JSON.stringify(user)}`)
}
