import mongoose from 'mongoose'
import db_config from 'Configs/database'
import logger from 'Configs/log'

export default class DBConnector {
  public async connect(): Promise<void> {
    mongoose.connection.on('error', err => {
      logger.info('Mongoose default connection has occured ' + err + ' error')
    })

    await mongoose.connect(db_config.uri, {
      useNewUrlParser: true
    })

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        logger.error(
          'Mongoose default connection is disconnected due to application termination'
        )
        process.exit(0)
      })
    })

    return Promise.resolve()
  }
}
