import express from 'express'
import app_root from 'app-root-path'
import { router } from 'Routes/web'

export default class WebServiceProvider {
  constructor() {
    this.app = express()
  }

  boot() {
    this.app.use(express.static(app_root.path + '/public_html'))
    this.app.use(router)

    return this.app
  }
}
