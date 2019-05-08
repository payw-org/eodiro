import mongoose from 'mongoose';
import { db_config } from 'Configs/database';

export default class DBServiceProvider {
    boot () {
        this.connect();
    }

    connect () {
        mongoose.connection.on('connected', () => { 
            console.log("Mongoose default connection is open to ", db_config.uri);
        });
    
        mongoose.connection.on('error', (err) => {
            console.log("Mongoose default connection has occured " + err + " error");
        });
    
        mongoose.connection.on('disconnected', () => {
            console.log("Mongoose default connection is disconnected");
        });

        mongoose.connect(db_config.uri, {
            useNewUrlParser: true
        });
    
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log("Mongoose default connection is disconnected due to application termination");
                process.exit(0)
            });
        });
    }
}
