import DBConnector from 'DB/DBConnector';
import DBInitializer from 'DB/DBInitializer';

export default class DBServiceProvider {
  constructor() {
    this.dbConnector = new DBConnector();
    this.dbInitializer = new DBInitializer();
  }

  boot() {
    this.dbConnector.connect();
    this.dbInitializer.init();

    return Promise.resolve();
  }
}
