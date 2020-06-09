const db = require('../data/dbConfig.js')

module.exports = {
  getUsersCart,
  addToCart,

  findAllUsers,
  findUserById,
  findUserByFilter,
  register,
  editUser,
  deleteUser
}

function getUsersCart(userId) {
  return db('cart')
    .join('users', 'users.id', 'cart.user_id')
    .select('cart.id', 'cart.name', 'cart.price', 'cart.description')
    .where('cart.user_id', userId)
}

function addToCart(item){
  return db('cart')
    .insert(item)
}

function findAllUsers () {
  return db('users')
}

function findUserById (id) {
  return db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first()
}

function findUserByFilter (filter) {
  return db('users')
    .select('username', 'password', 'id')
    .where(filter)
}

function register (user) {
  return db('users').insert(user, 'id')
}

function deleteUser (id) {
  return db('users')
    .where({ id })
    .del()
}

function editUser (changes, id) {
  return db('users')
    .where({ id })
    .update(changes)
}
