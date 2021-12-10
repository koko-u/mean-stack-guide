import dotenv from 'dotenv'
dotenv.config()

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`

export const env = {
  port: process.env.PORT ?? 3000,
  mongo_url: url,
}
