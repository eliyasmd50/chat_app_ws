import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

// express server
const app = express();

// serve frontend static files
app.use('/', express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
    console.log(`Listening on the server post ${PORT}`);
});

// websocket io server
const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3500','http://127.0.0.1:3500']
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} conected `);
    socket.on('message', data => {
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`);
    })
})

