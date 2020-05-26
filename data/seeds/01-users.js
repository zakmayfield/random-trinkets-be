
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'geralt',
          email: 'geralt@rivia.com',
          password: 'f@ck'
        },
        {
          username: 'jon',
          email: 'jon@winterfell.com',
          password: 'kingindanorf'
        },
        {
          username: 'roland',
          email: 'roland@gilead.com',
          password: 'otherworlds'
        }
      ]);
    });
};
