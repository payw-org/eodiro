export default class DeviceIdHandler{

  constructor(){
  }

  /**
   * Make new clientId then,
   * store it and return it to store client local storage
   */
  newClient(){
    var clientId;
    clientId = createClientId();
    storeClientId(clientId);
    return clientId;
  }

  /**
   * Get clientInfo from DB by clientId
   * @param {String} clientId 
   */
  clientInfo(clientId){
    // check clientId with DB
    // if valid
    // return info
    // else
    storeClientId(clientId);
  }

  storeClientId(clientId){
    db.client.insert({
      "public-id": clientId,
      "land-list": []
    });
  }

  /**
   * Create hash value in 'sha1' method
   * hash value is decided by Date and random. So, value is unique.
   */
  createClientId(){
    const crypto = require('crypto');
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    let clientId = crypto.createHash('sha1').update(current_date + random).digest('base64');
    return clientId;
  }
}
db.client.insert({
  "public-id" : "123123123",
  "lands": [
    "asb",
    "sgtw",
    "w34r"
  ]
});