import express from 'express'
import cors from 'cors'
import vhost from 'vhost'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import server_config from 'Configs/server'
import { server_private } from 'Configs/private'
import DBServiceProvider from 'Provider/DBServiceProvider'
import APIServiceProvider from 'Provider/APIServiceProvider'
import WebServiceProvider from 'Provider/WebServiceProvider'

const db_provider = new DBServiceProvider()
const api_provider = new APIServiceProvider()
const web_provider = new WebServiceProvider()

db_provider.boot() // asynchronous
const api_service = api_provider.boot()
const web_service = web_provider.boot()

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
  })
)
app.use(vhost('api.' + server_config.base_uri, api_service))
app.use(web_service)

app.listen(server_private['node_port'])
