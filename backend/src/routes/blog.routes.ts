
import {Hono} from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt"
import { get } from "mongoose"
import { createBlogSchema,updateBlogSchema } from "@nitin2024/medium-common"

 export const blogRouter  = new Hono<{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string
    },
    Variables:{
      userId: string;
    }
}>()

//middleware here to extract the userId from the jwt token provdexd 

blogRouter.use("/*",async(c,next)=>{

  const authHeader =  c.req.header("authorization") || "";
  const user =await verify(authHeader, c.env.JWT_SECRET)
  if(user){
    //@ts-ignore
    c.set("userId",user.id)
    await next()
  }
  else{
    c.status(403)
    return c.json({
      msg:"Not authorized "
    })
  }


})

//add the status codes in all the routes 
  blogRouter.post('/', async (c) => {
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
 }

})

  blogRouter.put('/', async (c) => {
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
        })



        // todo -> add paginatio
        blogRouter.get('/bulk', async(c) => {
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
      
        
        })
  
  blogRouter.get('/:id', async(c) => {
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



  })
  
  //