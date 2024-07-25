
import { Hono } from "hono"
import { signin, signup } from "../controller/userController"

export const userRouter = new Hono()


userRouter.post('/signup',signup )
userRouter.post('/signin',signin)