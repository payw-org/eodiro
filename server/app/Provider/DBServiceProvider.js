import DBConnector from 'DB/DBConnector'

export default class DBServiceProvider {
    constructor() {
        this.dbConnector = new DBConnector();
    }

    boot() {
        this.dbConnector.connect();
    }
}
