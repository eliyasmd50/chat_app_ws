const socket = new WebSocket('ws://localhost:3500');

function sendMessage(e) {
    e.preventDefault();
    const input = document.querySelector('input');
    if(input.value) {
        socket.send(input.value);
        input.value = "";
    }
    input.focus();
}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// Listen for message
socket.addEventListener('message', ({data}) => {
    let li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li);
})