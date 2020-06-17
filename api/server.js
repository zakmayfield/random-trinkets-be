const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const dbConnection = require('../data/dbConfig')
const knexSessionStore = require('connect-session-knex')(session)
const requiresAuth = require('../api-auth/restricted-mw')
/////
const usersRouter = require('../api-users/users-router.js')
const authRouter = require('../api-auth/auth-router.js')
const trinketsRouter = require('../api-trinkets/trinkets-router')
/////
const sessionConfig = {
  name: 'userSession',
  secret: process.env.SESSION_SECRET || 'whats in the booox?!',
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes in ms
    secure: process.env.COOKIE_SECURE || false, // true means only over HTTPS
    httpOnly: true //JS code on the client cannot access the sesh cookie
  },
  resave: false,
  saveUnitialized: true, //GDPR compliance --> read docs
  store: new knexSessionStore({
    knex: dbConnection,
    tableName: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 10 // delete expired sessions - in ms
  })
}
/////
const server = express()
/////
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(session(sessionConfig))
/////
server.use('/api/users', requiresAuth, usersRouter)
server.use('/api/auth', authRouter)
server.use('/api/shop', requiresAuth, trinketsRouter)
/////
server.get('/api', (req, res) => {
  res.status(200).json({ api: 'running' })
})
/////
module.exports = server
