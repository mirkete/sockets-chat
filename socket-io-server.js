import { Server } from "socket.io"
import { createServer } from "node:http"
import { createApp } from "./index.js"
import { manageSockets } from "./routing/sockets.js"
import { UsersModel } from "./model/UsersModel.js"

createApp()
  .then(({ app, PORT }) => {
    const server = createServer(app)
    const io = new Server(server, { connectionStateRecovery: {} })
    manageSockets({ server: io, model: UsersModel })

    server.listen(PORT, () => {
      console.log("SERVER WORKING ON SOCKET.IO")
    })
  })
