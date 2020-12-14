const adminUsers = [
  { name: 'rainwildest', email: 'rainwildest@163.com', gender: 1, profile_photo: '' },
  { name: 'vivi', email: 'shiwei254@gmail.com', gender: 0, profile_photo: '' }
]

const users = []
const generateAdminUsers = (uuid) => {
  const usersAtInside = []
  for (let i = 0; i < adminUsers.length; ++i) {
    usersAtInside.push({
      id: uuid(),
      is_admin: true,
      is_staff: false,
      ...adminUsers[i]
    })
  }

  users.push(...usersAtInside)
  return usersAtInside
}

module.exports = {
  users,
  generateAdminUsers
}
