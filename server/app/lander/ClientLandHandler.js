import clientLand from 'Database/models/clientLand';
import logger from 'Configs/log';

export default class ClientLandHandler{

  constructor(){
  }

  /**
   * Get clientLands from DB by clientId
   * if clientId is not exist, then store clientId and return lands (nothing)
   * @param {String} clientId 
   */
  static getClientLands(clientId){
    var clientInfo = this.findClientInfo(clientId);
    return clientInfo;
    if(clientInfo['public_id'] == clientId)
      return JSON.stringify(clientInfo['lands']);
    else{
      this.storeClientInfo(clientId);
      clientInfo = this.findClientInfo(clientId);
      return clientInfo['lands'];
    }
  }

  static async findClientInfo(clientId){
    var clientInfo;
    await clientLand.findOne(
      { "public_id": clientId },
      { "_id": false },
      (err,docs) => {
        if(err){
          clientInfo = null;
          logger.error("clientInfo find error: " + err);
        }
        else{
          clientInfo = docs;
        }
    });

    return clientInfo;
  }


  static storeClientInfo(clientId){
    clientLand.create({
      "public_id": clientId,
      "lands": []
    }, (err, docs) => {
      if (err) logger.error("clientLand save error: " + err);
    });
  }

  /**
   * Create hash value in 'sha1' method
   * hash value is decided by Date and random. So, value is unique.
   * return clientId
   */
  static createClientInfo(){
    const crypto = require('crypto');
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    let clientId = crypto.createHash('sha1').update(current_date + random).digest('base64');
    this.storeClientInfo(clientId);
    return clientId;
  }
}