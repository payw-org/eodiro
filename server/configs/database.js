let username = "eodiro";
let password = "weloveeodiro2019";
let host = "localhost";
let port = 27017;
let database = "eodiro_db";

const config = {
  uri: "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database
};

export default config;
