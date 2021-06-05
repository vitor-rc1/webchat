const newDate = () => {
  const dateNow = new Date();

  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`
  + ` ${dateNow.getHours()}:${dateNow.getMinutes()}`;
};

const users = [];

const disconnect = (socket, io) => {
  const index = users.findIndex(((user) => {
    console.log(Object.keys(user)[0]);
    return Object.keys(user)[0] === socket.id.slice(0, 16);
  }));
  console.log(index);
  users.splice(index, 1);
  io.emit('onlineUser', users);
};

const createMessage = (chatMessage, nickname, socket, io) => {
  const dateMessage = newDate();
  const message = `${dateMessage} - ${nickname || socket.id.slice(0, 16)}: ${chatMessage}`;
  io.emit('message', message);
};

const setNickname = (nickname, id, io) => {
  const index = users.findIndex((user) => user[id] === id);
    users[index][id] = nickname;
    io.emit('onlineUser', users);
};

const onlineUser = (socket, io) => {
  const id = socket.id.slice(0, 16);
  users.push({ [id]: id });
  io.emit('onlineUser', users);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('onlineUser', () => onlineUser(socket, io));
  socket.on('setNickname', ({ nickname, id }) => setNickname(nickname, id, io));
  socket.on('message', ({
    chatMessage, nickname,
  }) => createMessage(chatMessage, nickname, socket, io));
  socket.on('disconnect', () => disconnect(socket, io));
});