import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirkito18',
  database: 'chat'
})

export class MessagesModel {
  constructor ({ IOserver }) {
    this.server = IOserver
  }

  async userConnection (socket) {
    let result
    try {
      result = await connection.execute(
        'SELECT user, message FROM message ' +
        'ORDER BY timestamp'
      )
    } catch (e) {
      console.error(e)
    }
    console.log(result[0])
    result[0].forEach(({ user: username, message }, i) => {
      socket.emit('chat-message', { message, username })
      console.log('emitted ' + i)
    })
    this.server.emit('user-count', this.server.engine.clientsCount)
  }

  loggedIn (socket) {
    return () => {
      socket.join('chat-room')
    }
  }

  chatMessage () {
    return (data) => {
      connection.query(
        'INSERT INTO message (user, message) ' +
        'VALUES (?, ?)',
        [data.username, data.message]
      ).then(() => {
        this.server.to('chat-room').emit('chat-message', { message: data.message, username: data.username })
      })
    }
  }

  userDisconnection () {
    return () => {
      this.server.emit('user-count', this.server.engine.clientsCount)
    }
  }
}
