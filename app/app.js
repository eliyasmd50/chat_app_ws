const socket = io('ws://localhost:3500');

function sendMessage(e) {
    e.preventDefault();
    const input = document.querySelector('input');
    if(input.value) {
        socket.emit('message', input.value);
        input.value = "";
    }
    input.focus();
}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// Listen for message
socket.on('message', data => {
    let li = document.createElement('li');
    console.log(data);
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})