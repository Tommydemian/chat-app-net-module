const net = require('net');

const PORT = process.env.PORT || 8080; 
const hostname = '127.0.0.1';

const server = net.createServer()

// an array of clients sockets.
const clients = [];

// client[0] => socket
// client[0] => socket

server.on('connection', (socket) => { // particular/ individual socket being crated with every client.
    clients.push(socket)
    console.log('A new connection has been established');

    socket.on('data', (data) => {
        clients.forEach(client => {
            client.write(data);
        })
    })
})


server.listen(PORT, hostname, () => {
    console.log('opened server on', server.address());
});
// server.address => {port: string family: string, address: string}