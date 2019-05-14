import { db_private } from './private';

let username = "eodiro";
let password = "weloveeodiro2019";
let host = "localhost";
let port = 27017;
let database = db_private['db_name'];

const config = {
  uri: "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database
};

export default config;
