

import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from "hono";
import { sign } from 'hono/jwt'
import { signupSchema } from "@nitin2024/medium-common"
import { signinSchema } from "@nitin2024/medium-common"

export const userRouter = new Hono<{
    Bindings:{
            DATABASE_URL:string,
            JWT_SECRET:string
    }
}>()

export async function signup(c:Context){
   
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
      const body = await c.req.json();
      const {success} = signupSchema.safeParse(body)  ;
      if( ! success){
        return c.json({
          msg:"Invalid input"
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
      }


export async function signin(c:Context){  
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
    }

    
    export async function getProfile(c: Context) {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      try {
        const userId = c.get("userId");
        const res = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
          include: {
            blogs: true,
          },
        });
    
        if (res == null) {
          return c.json({ msg: "User not found" });
        } else {
          return c.json({
            user: {
              id: res.id,
              name: res.name,
              username: res.username,
              password: res.password,
              blogs: res.blogs,
            },
          });
        }
      } catch (error) {
        console.error(error); // Log the error for debugging purposes
        c.status(400);
        return c.json({ msg: "Error fetching user details" });
      } finally {
        await prisma.$disconnect(); // Ensure the PrismaClient is properly disconnected
      }
    }
    