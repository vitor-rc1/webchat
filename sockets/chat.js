const newDate = () => {
  const dateNow = new Date();

  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`
  + ` ${dateNow.getHours()}:${dateNow.getMinutes()}`;
};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`Mensagem ${chatMessage}`);

    const dateMessage = newDate();
    const message = `${dateMessage} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});