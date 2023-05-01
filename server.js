const net = require('net');
const { generateRandomNumber } = require('./utils')

const PORT = process.env.PORT || 8080; 
const hostname = '127.0.0.1';

const server = net.createServer()

// an array of clients sockets.
const clients = [];

// client[0] => socket
// client[0] => socket

server.on('connection', (socket) => { // particular/ individual socket being crated with every client.
    console.log('A new connection has been established');
    const clientId = String(generateRandomNumber())
    // inform everybody that x user has joined teh chatroom
    clients.forEach((client) => {
        client.socket.write(`User ${clientId} has joined!`)
    })

    socket.write(`id-${clientId}`)
    clients.push({id: clientId, socket })


    socket.on('data', (data) => {
        dataString = data.toString('utf-8')
        const id = dataString.substring(0, dataString.indexOf('-')) 
        const message = dataString.substring(dataString.indexOf('-message-') + 9)


        clients.forEach(client => {
            client.socket.write(`User ${id}: ${message}`); // write to each client socket.
        })
    });

    // let everyone know x user left the chatroom
    socket.on('end', () => {
    clients.forEach((client) => {
        client.socket.write(`User ${clientId} has left the chatroom`);
    })    
    })
    
})


server.listen(PORT, hostname, () => {
    console.log('opened server on', server.address());
});
// server.address => {port: string family: string, address: string}