import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from 'hono'



export async function getTags(c: Context){
const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
}).$extends(withAccelerate());

try {
    const res = await prisma.tags.findMany({})

    return c.json({
        tags:res
    })
    
} catch (error) {
    console.log("error",error)
    return c.json({
        msg:"Error fetching blogs"
    })
}  
}


export const getPostsByTag = async (c: Context) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const tagParam = String(c.req.param('tag'));

    try {
        const res = await prisma.tags.findMany({
            where:{
                tag:tagParam
            },

            select:{
                post:{
                    select:{
                        author:{
                            select:{
                                username:true
                            }
                        },
                        id:true,
                        authorId:true,
                        title:true,
                        content:true,
                        createdAt:true
                    }
                    
                }
            }
        })

        if(res.length === 0){
            return c.json({
                msg:"NO post found "
            })
        }


        return c.json({
            posts: res[0].post.map((post) => ({
              username: post.author.username,
              id: post.id,
              title: post.title,
              authorId: post.authorId,
              content: post.content,
              createdAt: post.createdAt,
            })),
          });
          
    } catch (error) {
        console.log("error ",error)
    }
  


  };
  

