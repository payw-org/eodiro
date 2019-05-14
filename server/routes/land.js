import express from 'express';
import app_root from 'app-root-path';
import ClientLandHandler from 'Lander/ClientLandHandler'
import LandOwnerHandler from 'Lander/LandOwnerHandler'
import crypto from 'crypto';

const router = express.Router();

function cryptoLocation(location){
    return crypto.createHash('sha1').update(location).digest('base64');
}

router.get('/', async (req, res) => {
 
    //세션정보는 req.session 에 들어 있다
    if (req.session.clientInfo){
        var clientInfo = req.session.clientInfo;
        var clientLands = await ClientLandHandler.getClientLands(clientInfo['public_id']);
        req.session.clientInfo = {
            "public_id": clientInfo['public_id'],
            "lands": clientLands
        };
        res.cookie();
        res.send(req.session.clientInfo);
    }
    else{
        req.session.clientInfo = ClientLandHandler.createClientInfo();
        res.send("New Client Id is created.");
    }
});

router.get('/init', async (req, res) => {
    var locations = ["310-727","310-726","310-728"];
    locations.forEach(function(location,index){
        LandOwnerHandler.createLand(location);
    });
    res.send("");
});


router.get('/:building_num/:class_num', async (req, res) => {
    var location = req.params.building_num + "-" + req.params.class_num;
    var locations = ["310-727","310-726","310-728"];
    if(locations.includes(location)){
        if(!req.session || !req.session.clientInfo){
            req.session.clientInfo = await ClientLandHandler.createClientInfo();
        }
        var clientLands = await ClientLandHandler.addClientLand(req.session.clientInfo['public_id'],location);
        // res.json(clientLands);
        res.send(clientLands);
    }
    else{
        res.send("");
    }
});


router.get('*', (req, res) => {
  res.status(404).json({
    error: true,
    msg: "incorrect message"
  });
});

export { router };
