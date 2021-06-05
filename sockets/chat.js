const newDate = () => {
  const dateNow = new Date();

  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`
  + ` ${dateNow.getHours()}:${dateNow.getMinutes()}`;
};

const users = [];

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  socket.on('onlineUser', () => {
    users.push(socket.id.slice(0, 16));
    console.log(users);
    io.emit('onlineUser', users);
  });

  socket.on('setNickname', ({ nickname, id }) => {
    const index = users.indexOf(id);
    users[index] = nickname;
    io.emit('onlineUser', users);
  });
  
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`Mensagem ${chatMessage}`);

    const dateMessage = newDate();
    const message = `${dateMessage} - ${nickname || socket.id.slice(0, 16)}: ${chatMessage}`;
    io.emit('message', message);
  });
});