import { MessagesController } from '../controller/MessagesController.js'
import { login } from '../middlewares/login.js'

export function manageSockets ({ server, model }) {
  const messagesModelController = new MessagesController({ server, model })

  server.use(login())

  server.on('connection', (socket) => {
    // usersController.userConnection()
    messagesModelController.userConnection(socket)

    socket.on('chat-message', messagesModelController.chatMessage(socket))
    socket.on('disconnecting', messagesModelController.userDisconnection(socket))
  })
}
