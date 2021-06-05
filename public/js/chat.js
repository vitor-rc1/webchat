const socket = window.io();

const formSendMessage = document.querySelector('.form-send-message');
const inputMessage = document.querySelector('.input-message');
const saveNickname = document.querySelector('.save-nickname');

let nickname = '';

formSendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    chatMessage: inputMessage.value,
    nickname,
  };
  socket.emit('message', data);
  inputMessage.value = '';
  return false;
});

saveNickname.addEventListener('click', (e) => {
  const nicknameInput = document.querySelector('.nickname');
  e.preventDefault();
  nickname = nicknameInput.value;
  console.log(nickname);
});

const createMessage = (chatMessage) => {
  const chatMessages = document.querySelector('.chat');
  const li = document.createElement('li');
  li.innerText = chatMessage;
  chatMessages.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
