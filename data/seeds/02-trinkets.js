
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trinkets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('trinkets').insert([
        {
          name: 'Star Wars Coffee Mug',
          price: 10.99,
          description: 'Hand crafted, hand painted, the caffine is strong with this one.'
        }
      ]);
    });
};
