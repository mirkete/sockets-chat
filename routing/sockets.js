import { UsersController } from "../controller/UsersController.js"

export function manageSockets ({ server, model }) {

  const usersController = new UsersController({ server, model })

  server.on("connection", (socket) => {
    // usersController.userConnection()
    usersController.userConnection()

    socket.on("logged-in", usersController.loggedIn(socket))
    socket.on("chat-message", usersController.chatMessage(socket))
    socket.on("disconnecting", usersController.userDisconnection(socket))
  })
}