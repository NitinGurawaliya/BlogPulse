import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatars } from "./BlogCard"

export const FullBlog = ({blog}:{blog: Blog}) => {
  return <div>
        <Appbar/>
        <div className="flex justify-center ">
        <div className="grid grid-cols-12 pt-10 pt-200 w-full max-w-screen-xl px-10 ">
          <div className=" col-span-8">
                <div className="text-5xl font-extrabold">
                   {blog.title}
                </div>
                <div className="pt-2 text-slate-500">
                    posted on 2nd july,2024
                </div>
                <div className="pt-4">
                   {blog.content}
                </div>
        </div>
        <div className="  col-span-4">
                 <div className="text-slate-600  text-lg">
                 Author
                 </div>
                 <div className="flex">
                        <div className="pt-3">
                        <Avatars name={blog.author.name || "Anonymous"} />
                        </div>
                      <div>
                      <div className="font-bold p-3 text-xl" >
                        {blog.author.name || "Anonymous"}
                </div>
                <div className=" text-slate-500">
                Random catch phrase about the author ability to grab user attention 
                 </div>
             </div>
        </div>
        </div>
    </div>
    </div>
  </div>        
  
}
