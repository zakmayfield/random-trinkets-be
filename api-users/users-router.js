const router = require('express').Router()

// const cartRouter = require('../api-cart/cart-router')

// router.use('/:userId/cart', cartRouter)

const Users = require('./users-model')
const Cart = require('../api-cart/cart-model')

router.get('/:userId/cart', (req, res) => {
  const { userId } = req.params

  Users.getUsersCart(userId)
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(({ name, message, stack }) => {
      res.json(500).json({ name, message, stack })
    })
})

router.post('/:userId/cart', (req, res) => {
  const { userId } = req.params
  const item = {...req.body, user_id: userId}

  Users.addToCart(item)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(({ name, message, stack }) => {
      res.json(500).json({ name, message, stack })
    })
})

//get all users
router.get('/', (req, res) => {
  Users.findAllUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(({ name, message, stack }) => {
      res.json(500).json({ name, message, stack })
    })
})

//get a user by id
router.get('/:id', (req, res) => {
  const { id } = req.params

  Users.findUserById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ error: `404: Could not find an item with the id of ${id}` })
      } else {
        res.status(200).json(user)
      }
    })
    .catch(({ name, message }) => res.status(500).json({ name, message }))
})

//delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params

  Users.findUserById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ error: `404: Cannot find a user with the id of ${id}` })
      } else {
        Users.deleteUser(id)
          .then(() => {
            res
              .status(202)
              .json({ success: `${user.username} successfully deleted!` })
          })
          .catch(({ name, message }) =>
            res
              .status(500)
              .json({ serverError: 'Cannot delete user', name, message })
          )
      }
    })
    .catch(({ name, message }) => res.status(500).json({ name, message }))
})

//edit a user
router.put('/:id', (req, res) => {
  const { id } = req.params
  let updatedUser = req.body

  Users.findUserById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          error: `could not find an item with the id of ${req.params.id}`
        })
      } else {
        Users.editUser(updatedUser, id)
          .then(() => {
            Users.findUserById(id)
              .then(updated => {
                res.status(201).json(updated)
              })
              .catch(({ name, message }) =>
                res.status(400).json({ name, message })
              )
          })
          .catch(({ name, message }) => res.status(400).json({ name, message }))
      }
    })
    .catch(({ name, message }) => res.status(500).json({ name, message }))
})

module.exports = router
