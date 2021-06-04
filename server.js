const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });
  
require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
