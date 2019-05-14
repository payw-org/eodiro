import DBConnector from 'DB/DBConnector';
import DBInitializer from 'DB/DBInitializer';

export default class DBServiceProvider {
  constructor() {
    this.dbConnector = new DBConnector();
    this.dbInitializer = new DBInitializer();
  }

  async boot() {
    await this.dbConnector.connect();
    await this.dbInitializer.initialize();

    return Promise.resolve();
  }
}
