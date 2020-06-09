const router = require('express').Router()

const Cart = require('./cart-model')

// router.get('/', (req, res) => {
//   const { userId } = req.params

//   console.log('USER ID -->', userId)
//   Cart.getCart(userId)
//     .then(cart => {
//       res.status(200).json(cart)
//     })
//     .catch((name, message) => {
//       res.status(500).json({ name, message })
//     })
// })

module.exports = router
