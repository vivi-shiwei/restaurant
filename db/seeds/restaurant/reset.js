module.exports = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').truncate()
}
