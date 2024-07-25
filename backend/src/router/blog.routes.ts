
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


blogRouter.get('/bulk',getAllBlogs)
blogRouter.post('/',authMiddleware,createBlog )
blogRouter.put('/',authMiddleware,editBlog)
blogRouter.get('/:id',authMiddleware,getBlogById)
blogRouter.post("/comment/:id",authMiddleware,addComment)







//middleware here to extract the userId from the jwt token provdexd 

// blogRouter.use("/*",async(c,next)=>{

//   const authHeader =  c.req.header("authorization") || "";
//   const user =await verify(authHeader, c.env.JWT_SECRET)
//   if(user){
//     //@ts-ignore
//     c.set("userId",user.id)
//     await next()
//   }
//   else{
//     c.status(403)
//     return c.json({
//       msg:"Not authorized "
//     })
//   }


// })s
