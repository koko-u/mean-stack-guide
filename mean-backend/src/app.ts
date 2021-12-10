import express from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from "morgan"
import bodyParser from "body-parser"
import { posts } from "./data/posts"

export const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('tiny'))

app.post('/api/posts', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const post = req.body
  console.log({ post })
  res.status(StatusCodes.CREATED).json({
    message: 'post added successfully',
    post: { id: '46674b09-0607-44e0-99a3-dcf26dc99b96', title: 'New Post', content: 'You are added this post.'}
  })
})

app.get(
  '/api/posts',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {

    res.status(StatusCodes.OK).json({
      message: 'Post fetched successfully',
      posts,
    })
  }
)
