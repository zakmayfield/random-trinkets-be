const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('../api-users/users-router.js')
const authRouter = require('../api-auth/auth-router.js')
const trinketsRouter = require('../api-trinkets/trinkets-router')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)
server.use('/api/shop', trinketsRouter)

server.get('/api', (req, res) => {
  res.status(200).json({ api: 'running' })
})

module.exports = server