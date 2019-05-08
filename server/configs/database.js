let username = "eodiro";
let password = "weloveeodiro2019";
let host = "localhost";
let port = 27017;
let database = "eodiro_db";

let db_config = {
    uri: "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database
}

export { db_config };
