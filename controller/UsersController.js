export class UsersController {

  constructor({ server, model }) {
    this.server = server
    this.usersModel = new model({ IOserver: server })
  }

  userConnection (socket) {
    return this.usersModel.userConnection(socket)
  }

  loggedIn (socket) {
    return this.usersModel.loggedIn(socket)
  }

  chatMessage (socket) {
    return this.usersModel.chatMessage(socket)
  }

  userDisconnection (socket) {
    return this.usersModel.userDisconnection(socket)
  }
}