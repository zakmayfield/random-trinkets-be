const db = require('../data/dbConfig.js')

module.exports = {
  findAllUsers,
  findUserById,
  findUserByFilter,
  register,
  deleteUser
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
    .select('username', 'password')
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
