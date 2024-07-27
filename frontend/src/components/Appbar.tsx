import { Link } from "react-router-dom"
import { Avatars } from "./BlogCard"

export const Appbar = () => {
  return (
    <div className="border-b py-4 flex justify-between px-10">
        <Link to={"/blogs"} className="flex font-bold text-2xl flex-col justify-center cursor-pointer">
        Medium 
        </Link>
        <div>
        <Link to={"/publish"}>
           <button type="button" className="text-white mr-4 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">new</button>
        </Link>
            <Avatars name="nitin" />
        </div>    
    </div>
  )
}
