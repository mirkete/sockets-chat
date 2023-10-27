import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const socket = io()
const url = new URL(window.location.href)
const username = window.localStorage.getItem('username')

function logUser () {
  return new Promise((resolve, reject) => {
    if (username) {
      socket.emit('logged-in', username)
      resolve()
    } else {
      window.location.replace(url.origin + '/login')
    }
  })
}

logUser()
  .then(() => {
    const form = document.querySelector('#form')
    const message = document.querySelector('#message')
    const messagesContainer = document.querySelector('.messages-container')

    socket.on('chat-message', (msg) => {
      const messageClass = msg.username === username ? 'own-message' : 'external-message'
      messagesContainer.insertAdjacentHTML('beforeend', `<li class="single-message ${messageClass}">${msg.username}: ${msg.message}</li>`)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    })

    const userCount = document.getElementById('user-count')
    socket.on('user-count', (users) => {
      userCount.innerHTML = 'Currently active: ' + users
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (message.value) {
        socket.emit('chat-message', { message: message.value, username })
        message.value = ''
      }
    })
  })
