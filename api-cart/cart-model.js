const db = require('../data/dbConfig.js')

module.exports = {
  getCart
}

function getCart (userId) {
  return db('cart')
    .join('users', 'users.id', 'cart.user_id')
    .select('cart.id', 'cart.name', 'cart.price', 'cart.description','cart.user_id')
    .where('cart.user_id', '=', userId)
}
