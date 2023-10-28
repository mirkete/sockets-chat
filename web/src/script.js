import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const socket = io()
const url = new URL(window.location.href)
const localUsername = window.localStorage.getItem('username')

function createMessage ({ message, username, timestamp, messageClass }) {
  return `
  <li class="single-message ${messageClass}">
    ${username}: ${message}
    <p class="message-timestamp">${timestamp}</p>
  </li>
  `
}

function obtainTime (timestamp) {
  const daysFrom = Math.round((new Date(timestamp) - Date.now()) / 86400000)
  if (Math.abs(daysFrom) < 1) { return 'Hoy' }
  const rtf = new Intl.RelativeTimeFormat('es')
  const formattedDate = rtf.format(daysFrom, 'days')
  return formattedDate
}

function logUser () {
  return new Promise((resolve, reject) => {
    if (localUsername) {
      socket.emit('logged-in', localUsername)
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

    socket.on('chat-message', ({ message, username, timestamp }) => {
      const messageClass = username === localUsername ? 'own-message' : 'external-message'
      const formattedTimestamp = obtainTime(timestamp)
      messagesContainer.insertAdjacentHTML('beforeend', createMessage({ message, username, messageClass, timestamp: formattedTimestamp }))
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    })

    const userCount = document.getElementById('user-count')
    socket.on('user-count', (users) => {
      userCount.innerHTML = 'Currently active: ' + users
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (message.value) {
        socket.emit('chat-message', { message: message.value, username: localUsername })
        message.value = ''
      }
    })
  })
