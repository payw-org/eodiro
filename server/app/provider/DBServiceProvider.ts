import DBConnector from 'DB/DBConnector'
import DBInitializer from 'DB/DBInitializer'

export default class DBServiceProvider {
  private dbConnector: DBConnector
  private dbInitializer: DBInitializer

  public constructor() {
    this.dbConnector = new DBConnector()
    this.dbInitializer = new DBInitializer()
  }

  public async boot(): Promise<void> {
    await this.dbConnector.connect()
    await this.dbInitializer.initialize()

    return Promise.resolve()
  }
}
