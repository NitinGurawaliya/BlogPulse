import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// import { createBlogSchema,updateBlogSchema } from "@nitin2024/medium-common"
import {createBlogSchema,updateBlogSchema } from "../../../common/src/index";


export async function createBlog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Validate the request body against the schema
  const result = createBlogSchema.safeParse(body);
  if (!result.success) {
    // Extract validation errors and send a detailed response
    const errors = result.error.format();
    console.log(errors);
    return c.json({ msg: "Enter all inputs correctly", errors }, 400);
  }

  const authorId = c.get("userId");

  try {
    const tagNames = body.tags.map((tag: string) => tag.trim());

    const blog = await prisma.blog.create({
      data: {
        content: body.content,
        title: body.title,
        authorId: parseInt(authorId),
        tags: {
          connectOrCreate: tagNames.map((tag: string) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      id: blog.id,
      content: blog.content,
      title: blog.title,
      tags: blog.tags.map(tag => tag.tag)
    });
  } catch (error) {
    console.log("Error in creating blog ", error);
    return c.json({ msg: "Error while creating the blog" }, 500);
  } finally {
    await prisma.$disconnect();
  }
}


export async function editBlog(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success, error } = updateBlogSchema.safeParse(body);
  if (!success) {
    console.log(error); // Log the validation error
    return c.json({ msg: "Invalid inputs" }, 400);
  }

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        content: body.content,
        title: body.title,
        tags: {
          connectOrCreate: body.tags.map((tag: string) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      id: blog.id,
      blog,
    });
  } catch (error) {
    console.log("Error in editing blog:", error); // Log the error for debugging
    return c.json({ msg: "Error while editing the blog" }, 500);
  } finally {
    await prisma.$disconnect(); // Ensure the PrismaClient is properly disconnected
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
          },
          tags:true
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
      },
      comment:{
        select:{
          id:true,
          content:true,
          user:{
            select:{
              name:true
            }
          }    
        }
      },
      tags:true
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



export async function deletePost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id: number = Number(c.req.param('id'));
     
    const isPostExist = await prisma.blog.findFirst({
      where: {
        id: id,
        authorId:c.get("userId")  
      },
    });

    if (isPostExist == null) {
      return c.body('Post does not exists');
    }

    const res = await prisma.blog.delete({
      where: {
        id: id,
        authorId: c.get('userId'),
      },
    });
    return c.json({
      message: 'post deleted',
    });
  } catch (error) {
    return c.json({ msg: `Internal server error: ${error}` }, 500);
  }
}

