const socket = window.io();

const formSendMessage = document.querySelector('.form-send-message');
const inputMessage = document.querySelector('.input-message');

formSendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const newDate = () => {
  const dateNow = new Date();

  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`
  + ` ${dateNow.getHours()}:${dateNow.getSeconds()}`;
};

const createMessage = ({ chatMessage, nickName }) => {
  const chatMessages = document.querySelector('.chat');
  const li = document.createElement('li');
  const dateMessage = newDate();
  li.innerText = `${dateMessage} - ${nickName}: ${chatMessage}`;
  chatMessages.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
