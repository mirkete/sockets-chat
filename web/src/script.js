import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js"

const socket = io()
const url = new URL(window.location.href)

function logUser () {
  return new Promise((resolve, reject) => {
    const username = localStorage.getItem("username")
    if (username) {
      socket.emit("logged-in", username)
      resolve()
    } else {
      window.location.replace(url.origin + "/login")
    }
  })
}

logUser()
  .then(() => {
    const form = document.querySelector("#form")
    const message = document.querySelector("#message")
    const messagesContainer = document.querySelector(".messages-container")

    socket.on("chat-message", (msg) => {
      messagesContainer.insertAdjacentHTML("beforeend", `<li>${msg}</li>`)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    })

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      if (message.value) {
        socket.emit("chat-message", message.value)
        message.value = ""
      }
    })
  })

