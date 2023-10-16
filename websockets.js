export function manageSockets (io) {

  return (socket) => {

    socket.on("disconnect", () => {
      console.log("user disconnected")
    })

    socket.on("chat-message", (message) => {
      io.to("chat-room").emit("chat-message", message)
    })

    socket.on("logged-in", (user) => {
      console.log("USER LOGGED: " + user)
      socket.join("chat-room")
    })
  }
}