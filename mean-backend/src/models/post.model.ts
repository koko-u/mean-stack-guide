import mongoose, { Document, Schema } from 'mongoose'

export interface PostDoc extends Document {
  title: string
  content: string
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

export const PostModel = mongoose.model<PostDoc>('Post', postSchema)
