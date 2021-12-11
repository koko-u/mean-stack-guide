import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { connectDb } from './db'
import { postsRouter } from './router'

export const app = express()

connectDb().catch((err) => {
  console.log(';(')
  process.exit(1)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('tiny'))
app.use('/api/posts', postsRouter)

// app.post(
//   '/api/posts',
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const post = new PostModel({
//       title: req.body.title,
//       content: req.body.content,
//     })
//     const saved = await post.save()
//
//     res.status(StatusCodes.CREATED).json({
//       message: 'post added successfully',
//       post: saved,
//     })
//   }
// )
//
// app.get(
//   '/api/posts',
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const posts = await PostModel.find()
//     res.status(StatusCodes.OK).json({
//       message: 'Post fetched successfully',
//       posts,
//     })
//   }
// )
