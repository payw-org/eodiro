import express from 'express';
import app_root from 'app-root-path';

let router = express.Router();

router.get('*', (req, res) => {
    res.sendFile(app_root.path + '/public_html/web_index.html');
});

export { router };
