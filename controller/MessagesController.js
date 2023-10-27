export class MessagesController {
  constructor ({ server, model: MessagesModel }) {
    this.server = server
    this.messagesModel = new MessagesModel({ IOserver: server })
  }

  userConnection (socket) {
    return this.messagesModel.userConnection(socket)
  }

  loggedIn (socket) {
    return this.messagesModel.loggedIn(socket)
  }

  chatMessage (socket) {
    return this.messagesModel.chatMessage(socket)
  }

  userDisconnection (socket) {
    return this.messagesModel.userDisconnection(socket)
  }
}
