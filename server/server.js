let subdomain = require('express-subdomain');
let express = require('express');
let fs = require('fs');

let app = express();

app.set('views', __dirname + '/../public_html');
app.set('view_engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/../public_html'));

app.get('*', (req, res) => {
    res.render('index.html');
});

let router = express.Router();

app.use(subdomain('test', router));
app.listen(8080);
