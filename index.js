const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

//Se crea el servidor de express
const app = express();

//Conexión a la BD
dbConnection();

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//CORS
app.use(cors());

//Directorio Público
app.use(express.static('public'));


//Escucha las peticiones en el puerto seleccionado
app.listen(process.env.PORT, ()=>{console.log(`El servidor esta corriendo en el puerto: ${process.env.PORT}`);})