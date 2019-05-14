import LandOwnerHandler from './LandOwnerHandler';
import clientLand from 'Database/models/clientLand';
import logger from 'Configs/log';
import crypto from 'crypto';

export default class ClientLandHandler{

  constructor(){
  }

  static createRandomHash(){
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('base64');
  }

  static async createClientInfo(clientId){
    if(!clientId)
      clientId = this.createRandomHash();
    let clientInfo = {
      "public_id": clientId,
      "lands": []
    };
    await clientLand.create(clientInfo, (err, docs) => {
      if (err) logger.error("clientLand save error: " + err);
    });
    return clientInfo;
  }

  static async addClientLand(clientId, location){
    var clientHasLand;
    // 땅을 갖고 있는지 확인
    await clientLand.findOne(
      { 
        "public_id": clientId,
        "lands": location
      },
      { "_id": false },
      (err,docs) => {
        if(err){
          clientHasLand = false;
          logger.error("clientInfo find error: " + err);
        }
        else{
          if(docs != null)
            clientHasLand = true;
          else
            clientHasLand = false;
        }
      }
    );

    // 땅을 갖고있지 않을 때
    if(!clientHasLand){
      await clientLand.updateOne(
        {'public_id': clientId},
        {$push: {'lands': location} }
      );
    }
    // 해당 땅의 주인 지정
    await LandOwnerHandler.changLandOwner(clientId,location);

    // 소유했던 땅 목록 반환
    return await this.getClientLands(clientId); 
  }

  /**
   * 
   * @param {String} clientId 
   */
  static async getClientLands(clientId){
    var clientInfo = await this.getClientInfo(clientId);

    if(clientInfo != null)
      return clientInfo['lands'];
    else{
      await this.createClientInfo(clientId);
      clientInfo = await this.getClientInfo(clientId);
      return clientInfo['lands'];
    }
  }

  static async getClientInfo(clientId){
    let clientInfo;
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
      }
    );

    return clientInfo;
  }
}