
exports.up = async (knex) => {
  return knex.schema.createTable('users', function (table) {
    table.string('id')
    table.increments('seq_id')
    table.string('name')
    table.date('birthday')
    table.string('gender')
    table.string('email')
    table.string('phone_number', 30)
    table.string('profile_photo')
    table.string('is_staff').defaultTo(false)
    table.boolean('is_admin').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.raw('current_timestamp')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')
  })
}

exports.down = async (knex) => {
  return knex.schema.dropTable('users')
}
