import { Router } from 'express'
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from './postsHandler'

// baseUrl: /api/posts
// GET /api/posts        Get all posts
// GET /api/posts/:id    Get the post
// POST /api/posts       Create a new post
// PUT  /api/posts/:id   Override the post
// PATCH /api/posts/:id  Update the post
// DELETE /api/posts/:id Delete the post

export const postsRoutes = Router()

postsRoutes
  .get('/', getAllPosts)
  .get('/:id', getPostById)
  .post('/', createNewPost)
  .patch('/:id', updatePost)
  .delete('/:id', deletePost)
