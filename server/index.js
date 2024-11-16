import { createServer } from 'http';
import { Server } from 'socket.io';

//http server
const httpServer = createServer();

// websocket io server
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500','http://127.0.0.1:5500']
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} conected `);
    socket.on('message', data => {
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`);
    })
})

httpServer.listen(3500, () => {
    console.log(`Server Listening on the port 3500`);
})