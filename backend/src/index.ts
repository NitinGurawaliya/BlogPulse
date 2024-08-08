import { userRouter } from './router/user.routes'
import { blogRouter } from './router/blog.routes'

import { Hono } from 'hono'

import { cors } from 'hono/cors'
import { tagRouter } from './router/tag.routes'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  }   
}>()


app.use('/api/*', cors())

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)
app.route("/api/v1/tag",tagRouter)



export default app
