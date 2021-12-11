import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { connectDb } from './db'
import { postsRoutes } from './routes'

export const app = express()

connectDb().catch((err) => {
  console.log(err)
  process.exit(1)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('tiny'))
app.use('/api/posts', postsRoutes)
