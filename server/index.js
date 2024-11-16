const ws = require('ws');
const server = new ws.Server({port:3500});

server.on('connection', socket => {
    socket.on('message', message => {
        const msg = Buffer.from(message);
        console.log(msg.toString());
        socket.send(`${message}`);
    })
})