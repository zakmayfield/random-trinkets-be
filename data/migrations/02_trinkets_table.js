
exports.up = function(knex) {
    return knex.schema.createTable('trinkets', trinket => {
        trinket.increments()
    
        trinket
          .string('name', 128)
          .notNullable()
          .unique()
    
        trinket
          .integer('price', 128)
          .notNullable()
          .unique()
    
        trinket.string('description', 128).notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('trinkets')
};
