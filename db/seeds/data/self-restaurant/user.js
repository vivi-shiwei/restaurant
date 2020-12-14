/* 虚拟用户 */
const users = []
for (let i = 0; i < 10; ++i) {
  users.push({
    name: `personnel_${(i + 1) < 10 ? `0${(i + 1)}` : (i + 1)}`,
    email: `personnel_${(i + 1) < 10 ? `0${(i + 1)}` : (i + 1)}@163.com`,
    gender: (((i + 1) % 2) === 0 ? 0 : 1),
    profile_photo: ''
  })
}

const staff = []
const generatePersonnelUsers = (uuid) => {
  const usersAtInside = []
  for (let i = 0; i < users.length; ++i) {
    usersAtInside.push({
      id: uuid(),
      is_admin: false,
      is_staff: true,
      ...users[i]
    })
  }

  staff.push(...usersAtInside)
  return usersAtInside
}

module.exports = {
  staff,
  generatePersonnelUsers
}
