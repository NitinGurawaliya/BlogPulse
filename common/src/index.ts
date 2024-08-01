import z from "zod"

//signup schema
export const signupSchema = z.object({
    username:z.string().email(),
    password:z.string().min(8),
    name:z.string().optional()
})

//signin schema
export const signinSchema = z.object({
    username:z.string().email(),
    password:z.string().min(8),
})

//createBlog schema
export const createBlogSchema = z.object({
    title:z.string(),
    content:z.string(),
    tags:z.string()
})

//updateBlog schema
export const updateBlogSchema = z.object({
    title:z.string(),
    content:z.string(),
    id:z.number(),
    tags:z.string()
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
export type CreateBlogInput = z.infer< typeof createBlogSchema>
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>


