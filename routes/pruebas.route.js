const express = require('express');
const router = express.Router();

const PruebaCtrl = require('../controllers/pruebas.ctrl');

const pruebaCtrl = new PruebaCtrl();

router.get('/test', pruebaCtrl.testCtrl);
router.get('/qr', pruebaCtrl.getQR);
router.get('/qr/download', pruebaCtrl.getQRDownload);
router.get('/base64', pruebaCtrl.getBase64);
router.get('/qr/visual', pruebaCtrl.verQR);
router.post('/mensaje', pruebaCtrl.sendMsg);
router.get('/init/client', pruebaCtrl.initClient);
router.get('/destroy/client', pruebaCtrl.destroyClient);

module.exports = router;