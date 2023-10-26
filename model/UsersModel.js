export class UsersModel {

  constructor({ IOserver }) {
    this.server = IOserver
  }

  userConnection () {
    this.server.emit("user-count", this.server.engine.clientsCount)
  }

  loggedIn (socket) {
    return () => {
      socket.join("chat-room")
    }
  }

  chatMessage () {
    return (data) => {
      this.server.to("chat-room").emit("chat-message", { message: data.message, username: data.username })
    }
  }

  userDisconnection () {
    return () => {
      this.server.emit("user-count", this.server.engine.clientsCount)
    }
  }
}