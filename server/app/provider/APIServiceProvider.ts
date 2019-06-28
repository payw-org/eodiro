import express, { Express } from 'express'
import bodyParser from 'body-parser'
import router from 'Routes/api/index'

export default class APIServiceProvider {
  private app: Express

  public constructor() {
    this.app = express()
  }

  public boot(): Express {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(router)

    return this.app
  }
}
