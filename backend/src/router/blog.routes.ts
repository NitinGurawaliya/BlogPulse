
import {Hono} from "hono"
import { addComment, createBlog, editBlog, getAllBlogs, getBlogById } from "../controller/blogController"
import { authMiddleware } from "../middleware/user"

 export const blogRouter  = new Hono<{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string
    },
    Variables:{
      userId: string;
    }
}>()


blogRouter.get('/bulk',authMiddleware,getAllBlogs)
blogRouter.post('/',authMiddleware,createBlog )
blogRouter.put('/',authMiddleware,editBlog)
blogRouter.get('/:id',authMiddleware,getBlogById)
blogRouter.post("/comment/:id",authMiddleware,addComment)
