module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  socket.on('clientMessage', (chatMessage) => {
    console.log(`Mensagem ${chatMessage}`);
    io.emit('message', { chatMessage, nickName: socket.id });
  });
});