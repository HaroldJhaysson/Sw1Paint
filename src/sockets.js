

module.exports = io => {

    var line_history =[];

    io.on('connection',socket=>{
        console.log('nuevo usuario conectado');

        for (let i in line_history){
            socket.emit('draw_line',{line:line_history[i]});
        }
        
        socket.on('draw_line',data=>{                     //recibe el cliente el servidor
            line_history.push(data.line);
            io.emit('draw_line',data);                      //emite del servidor los demas clientes
        });
    });
}