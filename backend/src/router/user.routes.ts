
import { Hono } from "hono"
import { signin, signup ,getProfile} from "../controller/userController"
import { authMiddleware } from "../middleware/user"

export const userRouter = new Hono()


userRouter.post('/signup',signup )
userRouter.post('/signin',signin)

userRouter.get('/myProfile',authMiddleware,getProfile)