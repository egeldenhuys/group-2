const cors = require('cors')

let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        socket.emit('new-message', 'OK');
        console.log(message);
    });
});



server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
