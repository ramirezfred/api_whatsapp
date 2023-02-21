const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // El puerto en el que se ejecutará el servidor

const cors = require('cors');
const morgan = require('morgan');

const http = require('http');

const HTTP_PORT = process.env.HTTP_PORT || 80;
const IP = process.env.IP || '172.26.4.123';

// Importamos las rutas de la API
const pruebasRoutes = require('./routes/pruebas.route');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Configuramos las rutas de la API
app.use('/api', pruebasRoutes);

// Arrancamos el servidor
// app.listen(PORT, () => {
//   console.log(`La API está corriendo en http://localhost:${PORT}`);
// });

// Servidor HTTP
const serverHttp = http.createServer(app);
serverHttp.listen(HTTP_PORT, IP);
serverHttp.on('listening', () => console.info(`Notes App running at http://${IP}:${HTTP_PORT}`));
