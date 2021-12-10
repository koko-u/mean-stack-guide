import mongoose, { Mongoose } from 'mongoose'
import { env } from '../env'

export const connectDb = async (): Promise<Mongoose | undefined> => {
  // let connection: Mongoose | undefined
  //
  // const onSuccess = (conn: Mongoose) => {
  //   console.log('Connected to database.')
  //   connection = conn
  // }
  // const onFailure = (err: any) => {
  //   console.log('Failed to connect the database', err)
  //   connection = undefined
  // }

  try {
    const connection = await mongoose.connect(env.mongo_url)
    console.log('Successfully Connected.')
    return connection
  } catch (err) {
    console.log('Failed to connect the database', err)
    return undefined
  }
}
