import { Request, Response } from 'express'
import { PostModel } from '../models/post.model'
import { StatusCodes } from 'http-status-codes'

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await PostModel.find()
  res.status(StatusCodes.OK).json({
    message: 'Post fetched successfully',
    posts,
  })
}

export const getPostById = async (req: Request, res: Response) => {
  const id = req.params['id']
  const post = await PostModel.findById(id)
  res.status(StatusCodes.OK).json({
    message: 'Post fetched successfully by id',
    post,
  })
}

export const createNewPost = async (req: Request, res: Response) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content,
  })
  const saved = await post.save()

  res.status(StatusCodes.CREATED).json({
    message: 'post added successfully',
    post: saved,
  })
}

export const updatePost = async (req: Request, res: Response) => {
  console.log({
    method: 'updatePost',
    req,
  })

  const id = req.params['id']
  const updated = await PostModel.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  )
  res.status(StatusCodes.OK).json({
    message: 'Successfully Updated',
    post: updated,
  })
}

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params['id']
  const deleted = await PostModel.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({
    message: 'Successfully Deleted',
    post: deleted,
  })
}
