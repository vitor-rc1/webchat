const socket = window.io();
const formSendMessage = document.querySelector('.form-send-message');
const inputMessage = document.querySelector('.input-message');
const saveNickname = document.querySelector('.save-nickname');
const onlineUsers = document.querySelector('.users');

let nickname = '';

formSendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    chatMessage: inputMessage.value,
    nickname: nickname || socket.id.slice(0, 16),
  };
  socket.emit('message', data);
  inputMessage.value = '';
  return false;
});

saveNickname.addEventListener('click', (e) => {
  const nicknameInput = document.querySelector('.nickname');
  e.preventDefault();
  nickname = nicknameInput.value;
  socket.emit('setNickname', { nickname, id: socket.id.slice(0, 16) });
});

const createMessage = (chatMessage) => {
  const chatMessages = document.querySelector('.chat');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  chatMessages.appendChild(li);
};

const addUsers = (users) => {
  onlineUsers.innerHTML = '';
  const socketUser = users.find((user) => user.id === socket.id.slice(0, 16));
  const usersWithoutSocketUser = users.filter((user) => user.id !== socket.id.slice(0, 16));
  console.log(socketUser);
  [socketUser, ...usersWithoutSocketUser].forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.nickname || user.id;
    li.setAttribute('data-testid', 'online-user');
    onlineUsers.appendChild(li); 
  });
};

const loadMessages = (messages = []) => {
  messages.forEach((message) => createMessage(message));
};

socket.on('message', (message) => createMessage(message));
socket.on('onlineUser', (users) => addUsers(users));
socket.on('loadMessages', (messages) => loadMessages(messages));

window.onload = () => {
  socket.emit('onlineUser');
  socket.emit('loadMessages');
};

window.onbeforeunload = () => {
  socket.disconnect();
};
