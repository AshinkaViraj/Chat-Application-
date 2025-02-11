const AshiSelectorBtn = document.querySelector('#Ashi-selector');
const DuleeSelectorBtn = document.querySelector('#Dulee-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Ashi' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    });
};

let messageSender = 'Ashi';

const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;
    if (name === 'Ashi') {
        AshiSelectorBtn.classList.add('active-person');
        DuleeSelectorBtn.classList.remove('active-person');
    } else if (name === 'Dulee') {
        DuleeSelectorBtn.classList.add('active-person');
        AshiSelectorBtn.classList.remove('active-person');
    }
    chatInput.focus();
};

AshiSelectorBtn.onclick = () => updateMessageSender('Ashi');
DuleeSelectorBtn.onclick = () => updateMessageSender('Dulee');

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    const message = {
        sender: messageSender,
        text: chatInput.value, // Corrected here
        timestamp,
    };

    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages)); // Save the whole array

    chatMessages.innerHTML += createChatMessageElement(message);

    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMessages.innerHTML = '';
});
