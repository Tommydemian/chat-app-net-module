const net = require("net")
const readline = require('readline/promises');

const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = net.createConnection({
    port: 8080, 
    host: '127.0.0.1'
}, async () => {
    console.log('connection established');

    const message = await rl.question('Enter a message >')  

    socket.write(message)
});

socket.on('data', (data) => {
  console.log(data.toString('utf-8'));
}) // I anm recieveing the message back from the server and logging it in the client-side


socket.on('end', () => {
    console.log('connection closed');
});
