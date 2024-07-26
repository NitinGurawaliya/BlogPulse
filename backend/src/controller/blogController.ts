import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogSchema,updateBlogSchema } from "@nitin2024/medium-common"


export async function createBlog(c:Context){

        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const body = await  c.req.json()
      const {success} = createBlogSchema.safeParse(body)
      if(!success){
        return c.json("Invalid inputs")
      }
      const authorId = c.get("userId")
    
     try {
      const blog= await prisma.blog.create({
        data:{
          content:body.content,
          title:body.title,
          authorId:parseInt(authorId)
        }
      })
    
      return c.json({
        id:blog.id
      })
     } catch (error) {
      msg:"Error while creating the blog "
      console.log("Error in creating blog ",error)
     }
    
    }


export async function editBlog(c:Context){
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())


    const  body = await c.req.json()

    const {success} = updateBlogSchema.safeParse(body)
    if(!success){
      return c.json("Invalid inputs")
    }
      try {
        const blog = await prisma.blog.update({
          where:{
            id:body.id
          },
          data:{
            content:body.content,
            title:body.title,
          }
        })
        return c.json({
          id:blog.id,
          blog
        })

      } catch (error) {
        return c.json({
          msg:"Error while editing the blog "
        })
      }
        
}


export async function getAllBlogs(c:Context){
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
      const blog = await prisma.blog.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })

      return c.json({
       blog
      })
       
    } catch (error) {
      return c.json({
        msg:"Error while fetching blogs "
      })
    }

  
  
}


export async function getBlogById(c:Context) {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

   try {
    const id = c.req.param("id")

    const blog = await prisma.blog.findUnique({
     where:{
      id:Number(id) 
     },
     select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }
     }
    })
    return c.json({
     blog
    })
   } catch (error) {
    c.json({
      msg:"Error while fetching this blog "
    })
   }
  
}

export async function addComment (c:Context) {

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const postId  = c.req.param("id")
    const userId = c.get("userId");
    const {content} = await c.req.json();
  
  
    const comment = await prisma.comment.create({
      data:{
        postId:parseInt(postId),
        userId:parseInt(userId),
        content,    
      },
    });
  
    return c.json({
      comment,
      msg:"Comment made successfully"
    })
  
}

