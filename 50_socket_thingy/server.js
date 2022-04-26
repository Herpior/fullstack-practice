const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/index.html")
});

io.on('connection', (socket)=>{
    io.emit('chat message', 'user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        io.emit('chat message', 'user disconnected');
        console.log('user disconnected');
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});