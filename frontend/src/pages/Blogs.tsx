import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {loading,blogs} = useBlogs()

  if(loading){
    return <div>
      <Appbar />
     <div>
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      
    </div>
    </div>

  }
  return (<div> 
    <Appbar />
  <div className="flex justify-center">
    <div >
      {blogs.map(blogs=><BlogCard  
        id={blogs.id}
       authorName={blogs.author.name}
       title={blogs.title}
       content={blogs.content}
       publishedDate={"23 July,2024"}
      />)}


      
    </div>
    
    </div>
    </div>
  )
}
