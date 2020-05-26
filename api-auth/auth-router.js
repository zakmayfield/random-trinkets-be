const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../api-users/users-model.js')

//registering a user
router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash

  Users.register(user)
    .then(() => {
      res.status(201).json({ success: `Welcome, ${user.username}!` })
    })
    .catch(({ name, message }) => {
      res.status(500).json({ error: 'could not register user', name, message })
    })
})

//login a user
router.post('/login', (req, res) => {
  let { username, password } = req.body

  Users.findUserByFilter({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          token
        })
      } else {
        res.status(401).json({ error: 'Invalid log in' })
      }
    })
    .catch(({ name, message }) => {
      res.status(500).json({ name, message })
    })
})

function generateToken (user) {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, 'whats in the booox!?', options)
}

module.exports = router
