import express, { Express } from 'express'
import app_root from 'app-root-path'
import router from 'Routes/web/index'

export default class WebServiceProvider {
  private app: Express

  public constructor() {
    this.app = express()
  }

  public boot(): Express {
    this.app.use(express.static(app_root.path + '/public_html'))
    this.app.use(router)

    return this.app
  }
}
