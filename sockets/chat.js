const { saveMessage, getAllMessages } = require('../models/message');

const newDate = () => {
  const dateNow = new Date();

  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`
  + ` ${dateNow.getHours()}:${dateNow.getMinutes()}`;
};

const users = [];

const disconnect = (socket, io) => {
  const index = users.findIndex(((user) => user.id === socket.id.slice(0, 16)));
  users.splice(index, 1);
  io.emit('onlineUser', users);
};

const createMessage = async (chatMessage, nickname, socket, io) => {
  const message = `${newDate()} - ${nickname}: ${chatMessage}`;
  await saveMessage({ message: chatMessage, nickname });
  io.emit('message', message);
};

const setNickname = (nickname, id, io) => {
  const index = users.findIndex((user) => user.id === id);
    users[index].nickname = nickname;
    io.emit('onlineUser', users);
};

const onlineUser = (socket, io) => {
  const id = socket.id.slice(0, 16);
  users.push({ id, nickname: '' });
  io.emit('onlineUser', users);
};

const loadMessages = async (socket) => {
  const messages = await getAllMessages();
  const formatedMessages = messages
    .map(({ message, nickname }) => `${newDate()} - ${nickname}: ${message}`);
  socket.emit('loadMessages', formatedMessages);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('onlineUser', () => onlineUser(socket, io));
  socket.on('setNickname', ({ nickname, id }) => setNickname(nickname, id, io));
  socket.on('message', ({
    chatMessage, nickname,
  }) => createMessage(chatMessage, nickname, socket, io));
  socket.on('disconnect', () => disconnect(socket, io));
  socket.on('loadMessages', () => loadMessages(socket));
});