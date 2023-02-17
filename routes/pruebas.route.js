const express = require('express');
const router = express.Router();

const PruebaCtrl = require('../controllers/pruebas.ctrl');

const pruebaCtrl = new PruebaCtrl();

router.get('/test', pruebaCtrl.testCtrl);
router.get('/qr', pruebaCtrl.getQR);
router.get('/base64', pruebaCtrl.getBase64);
router.post('/mensaje', pruebaCtrl.sendMsg);

module.exports = router;