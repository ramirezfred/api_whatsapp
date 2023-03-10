const {Client} = require('whatsapp-web.js');
const {LocalAuth} = require('whatsapp-web.js');
const imageQr = require('qr-image');

const fs = require('fs');
const path = require('path');

const qrcode = require('qrcode-terminal');

class PruebaCtrl {

  client;
  status = false;
  base64 = [];

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { 
        headless: true/*,
        args: ['--no-sandbox', '--disable-setuid-sandbox']*/
      }
    });

    console.log("Iniciando....");

    this.client.initialize();

    this.client.on("ready", () => {
      this.status = true;
      console.log("LOGIN_SUCCESS");
    });

    this.client.on("auth_failure", () => {
      this.status = false;
      console.log("LOGIN_FAIL");
    });

    this.client.on("qr", (qr) => {
      console.log('Escanea el codigo QR que esta en la carepta tmp');
      //qrcode.generate(qr, {small: true});
      this.generateImage(qr);
    });
  }

  destroyClient = async (req, res) => {
    try {

      this.status = false;
      this.base64 = [];
      
      await this.client.destroy();

      res.status(200).json({
        status : 'success',
        message : 'Client destroy'
      });

    } catch (e) {
      res.status(409).json({
        status : 'error',
        message : e.message
      });
    }
  };

  initClient = (req, res) => {
    try {
      this.client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { 
          headless: true/*,
          args: ['--no-sandbox', '--disable-setuid-sandbox']*/
        }
      });

      console.log("Iniciando....");

      this.client.initialize();

      this.client.on("ready", () => {
        this.status = true;
        console.log("LOGIN_SUCCESS");
      });

      this.client.on("auth_failure", () => {
        this.status = false;
        console.log("LOGIN_FAIL");
      });

      this.client.on("qr", (qr) => {
        console.log('Escanea el codigo QR que esta en la carepta tmp');
        //qrcode.generate(qr, {small: true});
        this.generateImage(qr);
      });

      res.status(200).json({
        status : 'success',
        message : "Iniciando cliente"
      });

    } catch (e) {
      res.status(409).json({
        status : 'error',
        message : e
      });
    }
  };

  testCtrl = (req, res) => {
    //res.send('Hola desde PruebaCtrl')
    res.status(200).json({
      status : 'success',
      message : 'API Corriendo...'
    });
  };

  sendMsg = async (req, res) => {
    try {
      //if (!this.status) res.send('error : WAIT_LOGIN');
      if (!this.status){
        res.status(409).json({
          status : 'error',
          message : 'WAIT_LOGIN' 
        });
      } 
      const response = await this.client.sendMessage(`${req.body.phone}@c.us`, req.body.message);
      //res.send('exito : '+response);
      res.status(200).json({
        status : 'success',
        message : response.id.id
      });
    } catch (e) {
      //res.send('error : '+e);
      res.status(409).json({
        status : 'error',
        //message : e.message
        message : e
      });
    }
  };

  getStatus() {
    return this.status;
  };

  generateImage = (base64) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr.image(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
    console.log(`Recuerda que el QR se actualiza cada minuto`);
    console.log(`Actualiza F5 el navegador para mantener el mejor QR`);
    this.base64[0] = base64;
  };

  getBase64 = (req, res) => {

    res.status(200).json({
      status : 'success',
      message : 'QR en base64',
      qr : this.base64
    });

  };

  getQR = (req, res) => {
    const filePath = path.join(__dirname, '../tmp', 'qr.svg');
    const img = fs.readFileSync(filePath);
    const imgBase64 = img.toString('base64');

    const imgObject = {
      base64: imgBase64
    };

    res.json(imgObject);
  };

  getQRDownload = (req, res) => {
    const filePath = path.join(__dirname, '../tmp', 'qr.svg');
    const img = fs.readFileSync(filePath);
    
    res.setHeader('Content-Disposition', 'attachment; filename=qr.svg');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Length', img.length);

    res.send(img);
  };

  verQR = (req, res) => {
    const filePath = path.join(__dirname, '../tmp', 'qr.svg');
    
    res.sendFile(filePath);
  };

}

module.exports = PruebaCtrl;
