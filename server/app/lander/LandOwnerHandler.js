import landOwner from 'Database/models/landOwner';
import logger from 'Configs/log';

export default class LandOwnerHandler{

  constructor(){
  
  }

  /**
   * 
   * @param {String} location 
   */
  static async createLand(location){
    await landOwner.create({
      "public_id": location,
      "owner_id": "root"
    }, (err, docs) => {
      if (err) logger.error("landOwner create error: " + err);
    });
  }

  /**
   * 
   * @param {String} location 
   */
  static async deleteLand(location){
    await landOwner.delete({
      "public_id": location
    }, (err, docs) => {
      if (err) logger.error("landOwner delete error: " + err);
    });
  }

  static async initLandOwner(){
    await landOwner.updateMany(
      {},
      {$set: {"owner_id": "root"} },
      (err, docs) => {
        if (err) logger.error("landOwner init error: " + err);
      }
    );
  }

  /**
   * 
   * @param {String} clientId 
   * @param {String} location 
   */
  static async changLandOwner(clientId,location){
    await landOwner.updateOne(
      {"public_id": location},
      {$set: {"owner_id": clientId} },
      (err, docs) => {
        if (err) logger.error("landOwner change error: " + err);
      }
    );
  }

}