import express from 'express';
import ClientLandHandler from 'Lander/ClientLandHandler'

const router = express.Router();

router.get('/', (req, res) => {
 
    //세션정보는 req.session 에 들어 있다
    if (req.session.clientInfo){
        var clientInfo = req.session.clientInfo;
        var clientLands = ClientLandHandler.getClientLands(clientInfo['public_id']);
        res.send(clientLands);
        req.session.clientInfo = {
            "public_id": clientInfo['public_id'],
            "lands": clientLands
        };
        res.send(req.session.clientInfo);
    }
    else{
        var clientId = ClientLandHandler.createClientInfo();
        req.session.clientInfo = {
            public_id: clientId,
            lands: []
        };
        res.send("New Client Id is created.");
    }
});

router.get('/create', (req, res) => {
    console.log('/process/login 라우팅 함수호출 됨');
 
    var paramID = req.body.id || req.query.id;
    var pw = req.body.passwords || req.query.passwords;

    if (req.session.user) {
        console.log('이미 로그인 되어 있음');

        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
        res.write('<h1>already Login</h1>');
        res.write('[ID] : ' + paramID + ' [PW] : ' + pw);
        res.write('<a href="/process/product">Move</a>');
        res.end();

    } else {
        req.session.user =
            {
                id: paramID,
                pw: pw,
                name: 'UsersNames!!!!!',
                authorized: true
            };
        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
        res.write('<h1>Login Success</h1>');
        res.write('[ID] : ' + paramID + ' [PW] : ' + pw);
        res.write('<a href="/process/product">Move</a>');
        res.end();
    }
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: true,
    msg: "incorrect message"
  });
});

export { router };
