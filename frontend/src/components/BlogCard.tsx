import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:number
    category:string[]
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    category
}:BlogCardProps) => {
  return <Link to={`/blog/${id}`}>
        <div className="border-b justify-start p-14 md:p-6 pb-6 cursor-pointer w-screen max-w-screen-md border-slate-200">
            <div className="flex">
                <div className="flex justify-center flex-col">
                <Avatars name={authorName} />
                </div>
               <div className="font-extralight flex justify-center flex-col text-sm pl-2">
                 {authorName}.
               </div>
               <div className="flex pl-1 justify-center flex-col">
                <Circle />
               </div>
               <div className="pl-2 flex justify-center flex-col text-slate-400 text-sm font-thin">
                {publishedDate}
               </div>
            </div>
            <div className="text-xl pt-4 font-semibold">
                {title}
            </div>
            <div className="font-thin text-md">
                {content.slice(0,100)+"...."}
            </div>
            <div className="text-sm font-thin pt-2  text-slate-500" >
                {`${Math.ceil(content.length/100)} minute(s) read `}
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
          {category.map((tag, index) => (
            <button
              key={index}
            //   className="text-sm px-3 py-1 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300"
            className="bg-gray-700 hover:bg-gray-500 text-white text-sm px-4 py-1  border rounded-full"
            >
              {tag}
            </button>
          ))}
        </div>
            

    </div>
    </Link>
  
}


function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-600">

    </div>
}

export function Avatars({name}:{name:string}){
    return <div className="relative  inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 rounded-full ">
    <span className="text-s  text-white  ">{name[0]}</span>
</div>
    
}   
