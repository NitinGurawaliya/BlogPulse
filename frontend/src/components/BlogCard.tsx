import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:number
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}:BlogCardProps) => {
  return <Link to={`/blog/${id}`}>
        <div className="border-b p-4 pb-6 cursor-pointer w-screen max-w-screen-md border-slate-200">
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
    </div>
    </Link>
  
}


function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-600">

    </div>
}

export function Avatars({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-white rounded-full dark:bg-gray-600">
    <span className="text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
    
}   
