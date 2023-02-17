const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // El puerto en el que se ejecutará el servidor

const cors = require('cors');
const morgan = require('morgan');

// Importamos las rutas de la API
const pruebasRoutes = require('./routes/pruebas.route');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Configuramos las rutas de la API
app.use('/api', pruebasRoutes);

// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`La API está corriendo en http://localhost:${PORT}`);
});