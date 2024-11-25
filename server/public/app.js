const socket = io('ws://localhost:3500');

const activity = document.querySelector('.activity');
const msgInput = document.querySelector('input');

function sendMessage(e) {
    e.preventDefault();
    if(msgInput.value) {
        socket.emit('message', msgInput.value);
        msgInput.value = "";
    }
    msgInput.focus();
}

document.querySelector('form')
    .addEventListener('submit', sendMessage);


// Listen for username
socket.on('username', data => {
    let userList = document.createElement('li');
    userList.textContent = `User ${data} Added to the chat room`;
    document.querySelector('ul').appendChild(userList);
})

// Listen for message
socket.on('message', data => {
    activity.textContent = "";
    let li = document.createElement('li');
    li.textContent = data;
    console.log(li);
    document.querySelector('ul').appendChild(li);
})

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5));
})


let activityTimer;
socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`;

    //clear after 3 seconds
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        activity.textContent = "";
    }, 3000)
})