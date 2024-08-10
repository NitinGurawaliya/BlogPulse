import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from 'hono'


export async function likePost(c:Context) {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {

        const  userId  = await c.get("userId")
        const postId = c.req.param("postId")
        const liked  = await prisma.likedBlog.create({
            data:{
                userId:Number(userId),
                postId:Number(postId)
            }
        })
        return c.json(liked)
    } catch (error) {
        console.log("error",error)
        return c.json("cannot like post")
    }
}


export async function unLikePost(c:Context) {

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {

        const  userId  = await c.get("userId")
        const postId = c.req.param("postId")

        const unLike = await prisma.likedBlog.deleteMany({
            where:{
                userId:Number(userId),
                postId:Number(postId)
            }
        })

        return c.json({
            msg:"Unliked Post",
            unLike
        })

    } catch (error) {
        console.log("Error",error);
        return c.json({
            Msg:"Error uniliking the blog"
        })
    }
}
export async function countLikes(c: Context) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const postId = c.req.param("postId");
      const count = await prisma.likedBlog.count({
        where: {
          postId: Number(postId),
        },
      });
  
      c.status(200);
      return c.json({ count }); // Return the count field explicitly
    } catch (error) {
      console.log("Error in counting likes:", error);
      c.status(500); // Use 500 for server errors
      return c.json({
        msg: "Error in likes count",
      });
    }
  }
  