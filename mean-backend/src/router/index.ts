import { Router, Request, Response } from 'express'
import { PostModel } from '../models/post.model'
import { StatusCodes } from 'http-status-codes'

// baseUrl: /api/posts
// GET /api/posts        Get all posts
// POST /api/posts       Create a new post
// PUT  /api/posts/:id   Override the post
// PATCH /api/posts/:id  Update the post
// DELETE /api/posts/:id Delete the post

export const postsRouter = Router()

postsRouter
  .get('/', async (req: Request, res: Response) => {
    const posts = await PostModel.find()
    res.status(StatusCodes.OK).json({
      message: 'Post fetched successfully',
      posts,
    })
  })
  .post('/', async (req: Request, res: Response) => {
    const post = new PostModel({
      title: req.body.title,
      content: req.body.content,
    })
    const saved = await post.save()

    res.status(StatusCodes.CREATED).json({
      message: 'post added successfully',
      post: saved,
    })
  })
  .delete('/:id', async (req: Request, res: Response) => {
    const id = req.params['id']
    const deleted = await PostModel.findByIdAndDelete(id)

    res.status(StatusCodes.OK).json({
      message: 'Successfully Deleted',
      post: deleted,
    })
  })
