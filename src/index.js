const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

//inicializacion
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// configuracion
app.set('port',process.env.PORT || 3000);                                                   //process.env.PORT || 
//middlewares

//sockets
require ('./sockets')(io);

//static file
app.use(express.static(path.join(__dirname,'public')));


// Inicializando el servidor

server.listen(app.get('port'), () => {
    console.log('Servidor en el puerto 3k');
});

