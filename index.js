import express from "express"
import logger from "morgan"
import { Server } from "socket.io"
import { createServer } from "node:http"
import { join } from "node:path"

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.static(join("web")))
const server = createServer(app)
const io = new Server(server)

io.on("connection", (socket) => {
  console.log("user connected")

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("chat-message", (message) => {
    console.log(message)
    io.emit("chat-message", message)
  })
})


app.use(logger("dev"))


server.listen(PORT, () => console.log("ON"))