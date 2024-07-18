
import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { sign } from 'hono/jwt'
import { Bindings } from "hono/types"
import { signupSchema } from "@nitin2024/medium-common"

import { signinSchema } from "@nitin2024/medium-common"

export const userRouter = new Hono<{
    Bindings:{
            DATABASE_URL:string,
            JWT_SECRET:string
    }
}>()


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  //add zod and hash password 
  const body = await c.req.json();
  const {success} = signupSchema.safeParse(body)  ;
  if( ! success){
    return c.json({
      msg:"Invalid input "
    })
  }
  
  try {
    const user = await prisma.user.create({
      data:{
        username:body.username,
        password:body.password,
        name:body.name
      }  
      })

      const jwt = await sign({id:user.id},c.env.JWT_SECRET);
      
      return c.json(jwt)    
    
  } catch (error) {
    c.status(403)
    return c.text("Internal sever error ")
    
  }
  
  
  
  
  
  })
  
  userRouter.post('/signin',async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())
  
  const body = await c.req.json()
  const {success} = signinSchema.safeParse(body)

  if(!success){
    return c.json({
      msg:"Invalid inputs "
    })
  }



  try {
    const user  = await prisma.user.findUnique({
        where:{
          username:body.username
        },
      })
      
      if(!user){
       return  c.text("no valid user ")
      }
      
      const jwt = await sign({id:user.id},c.env.JWT_SECRET)
      
      
      return c.json(jwt)

  } catch (error) {
    
  }

  
  })