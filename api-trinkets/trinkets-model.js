const db = require('../data/dbConfig.js')

module.exports = {
  getTrinkets,
  addToStore
}

function getTrinkets() {
    return db('trinkets')
}

function addToStore(item) {
    return db('trinkets')
      .insert(item)
}