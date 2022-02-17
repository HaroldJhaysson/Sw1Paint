function init(){
     let mouse ={
        click: false,
        moviendo: false,
        pos:{x:0,y:0},
        pos_prev:false
    };
    //ccanvas
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width=width;
    canvas.height=height;

    const socket = io();
    
    canvas.addEventListener('mousedown',(e) =>{
        mouse.click=true;
        console.log(mouse);
    });
    canvas.addEventListener('mouseup',(e) =>{
        mouse.click=false;
        console.log(mouse);
    });
    canvas.addEventListener('mousemove',(e) =>{
        mouse.pos.x= e.clientX/width;
        mouse.pos.y=e.clientY/height;
        mouse.moviendo=true;
        console.log(mouse);
    })

    socket.on('draw_line',data =>{
        const line = data.line;

        context.beginPath();
        context.lineWith=2;
        context.moveTo(line[0].x*width,line[0].y*height);
        context.lineTo(line[1].x*width,line[1].y*height);
        context.stroke();
    })
    function mainLoop(){
        if (mouse.click && mouse.moviendo && mouse.pos_prev){
            socket.emit('draw_line',{line:[mouse.pos,mouse.pos_prev]})   // emite de los clientes al servidor
            mouse.moviendo=false;
        }
        mouse.pos_prev={x:mouse.pos.x, y:mouse.pos.y};
        setTimeout(mainLoop,25);
    }
    mainLoop();
}

document.addEventListener('DOMContentLoaded',init);