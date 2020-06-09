exports.up = function (knex) {
  return knex.schema.createTable('users', user => {
    user.increments()

    user
      .string('username', 128)
      .notNullable()
      .unique()

    user
      .string('email', 128)
      .notNullable()
      .unique()

    user.string('password', 128).notNullable()
  })
  .createTable('cart', item => {
    item.increments()

    item.string('name', 128)

    item.integer('price', 128)

    item.string('description', 1080)

    item.integer('user_id', 128)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cart').dropTableIfExists('users')
}
