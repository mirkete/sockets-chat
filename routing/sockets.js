import { MessagesController } from '../controller/MessagesController.js'

export function manageSockets ({ server, model }) {
  const messagesModelController = new MessagesController({ server, model })

  server.on('connection', (socket) => {
    // usersController.userConnection()
    messagesModelController.userConnection(socket)

    socket.on('logged-in', messagesModelController.loggedIn(socket))
    socket.on('chat-message', messagesModelController.chatMessage(socket))
    socket.on('disconnecting', messagesModelController.userDisconnection(socket))
  })
}
