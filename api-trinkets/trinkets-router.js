const router = require('express').Router()

const Trinkets = require('./trinkets-model')

router.get('/', (req, res) => {
  Trinkets.getTrinkets()
    .then(shop => {
      res.status(200).json(shop)
    })
    .catch((name, message) => {
      res.status(500).json({ name, message })
    })
})

module.exports = router