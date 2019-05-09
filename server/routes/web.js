import express from 'express';
import app_root from 'app-root-path';

const router = express.Router();

router.get('*', (req, res) => {
  res.sendFile(app_root.path + '/public_html/home.html');
});

export { router };
