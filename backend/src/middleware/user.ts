import { Context } from "hono"
import { verify } from "hono/jwt"
export async function authMiddleware(c:Context,next:any){

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
  
}