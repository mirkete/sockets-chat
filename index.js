import express from 'express'
import logger from 'morgan'
import { join } from 'node:path'
import { createRouter } from './routing/routes.js'

const PORT = process.env.PORT ?? 3000

export async function createApp () {
  const app = express()
  app.use(express.static(join('web')))
  app.use(logger('dev'))
  app.use(express.json())
  app.use('/', createRouter())

  return { app, PORT }
}
