import { Appbar } from "./Appbar"
import { blog } from "../hooks"
import { Avatars } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 pt-10 w-full max-w-screen-xl px-10">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="flex mt-8  items-start">
              <div className="pt-3">
                <Avatars name={blog.author.name || "Anonymous"} />
              </div>
              <div className="pl-3">
                <div className="font-bold text-xl">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="text-slate-500">
                  Random catch phrase about the author ability to grab user attention
                </div>
              </div>
            </div>
            <div className="pt-2 text-slate-500">
              posted on 2nd july,2024
            </div>
            <div className="pt-4 mt-7">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4 pl-10 ">
            <div className="font-bold text-3xl">
              Category
            </div>
            <div className="space-y-2">
           {blog.tags.map((tag)=>(
            <div
            key={tag.id}
            className="text-black border-black border-y-1	 h-auto w-auto p-2 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out flex items-center justify-center">
            {tag.tag}
          </div>
           ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
