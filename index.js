import express from "express"
import logger from "morgan"
import { Server } from "socket.io"
import { createServer } from "node:http"
import { join } from "node:path"
import { manageSockets } from "./websockets.js"

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.static(join("web")))
app.use(logger("dev"))
app.get("/login", (req, res) => {
  res.sendFile(join(process.cwd(), "web", "login.html"))
})


const server = createServer(app)
const io = new Server(server)
io.on("connection", manageSockets(io))



server.listen(PORT, () => console.log("ON"))