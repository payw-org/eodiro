const bodyParser = require('body-parser')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV === 'development'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiRouter = require('./api')

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(apiRouter)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = dev ? 3020 : 3000

  server.listen(port, (err) => {
    if (err) {
      throw err
    }

    console.log(
      '[\x1b[33m',
      'server.js',
      `\x1b[0m]`,
      `listening on port ${port}`
    )
  })
})
