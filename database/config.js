const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        mongoose.connect(process.env.CNN);
        console.log('Conexión exitosa a la DB');

    }catch(error){
        console.log(error);
        throw Error('No se ha podido conectar a la base de datos');
    }
}

module.exports = {
    dbConnection
}