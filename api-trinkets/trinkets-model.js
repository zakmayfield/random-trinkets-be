const db = require('../data/dbConfig.js')

module.exports = {
  getTrinkets
}

function getTrinkets() {
    return db('trinkets')
}