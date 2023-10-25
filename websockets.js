export function manageSockets (io) {

  return (socket) => {
    io.emit("user-count", io.engine.clientsCount)

    socket.on("chat-message", (message) => {
      io.to("chat-room").emit("chat-message", message)
    })

    socket.on("logged-in", (user) => {
      socket.join("chat-room")
    })

    socket.on("disconnecting", () => {
      io.emit("user-count", io.engine.clientsCount)
    })
  }
}