export function login () {
  return (socket, next) => {
    if (socket.handshake.auth.username) {
      socket.join('chat-room')
      return next()
    }
    return next(new Error('Unauthorized. Please login'))
  }
}
