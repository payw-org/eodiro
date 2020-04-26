const express = require('express')
const cookieRouter = require('./cookie')

const apiRouter = express.Router()

apiRouter.use(cookieRouter)

module.exports = apiRouter
