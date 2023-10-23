import express from "express"
const app = express()
const router = express.Router()

export function createRouter () {
  router.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/web/landing.html")
  })

  router.get("/login", (req, res) => {
    res.sendFile(process.cwd() + "/web/login.html")
  })

  return router
}