import axios from "axios"
import { Appbar } from "./Appbar"
import { BACKEND_URL } from "../config"
import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
  const [title,setTitle] = useState("")
  const [tags,setTags] = useState<string[]>([])
  const [description,setDescription] = useState("")
  const navigate = useNavigate();

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const tagsArray = input.split(",").map(tag => tag.trim());
    setTags(tagsArray);
  };

  return <div>
    <Appbar />
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-screen-lg w-full">
        <input type="text " onChange={(e)=>{
          setTitle(e.target.value)
        }}  typeof="text" className="w-full my-4 bg-gray-50 border focus:outline-none  border-gray-300 text-gray-800 text-sm rounded-lg block p-2.5" placeholder="Title.." />

<input type="text " onChange={handleTagsChange}  typeof="text" className="w-full m-0 bg-gray-50 border focus:outline-none  border-gray-300 text-gray-800 text-sm rounded-lg block p-2.5" placeholder="Enter tags separated by commas" />

      </div>
    </div>
    <TextEditor onChange={(e)=>{
              setDescription(e.target.value)
      }} />
    
    <button onClick={async ()=>{
      const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
        title,
        tags,
        content:description
      },{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      });
      navigate(`/blog/${res.data.id}`)
     }}  type="submit" className="inline-flex items-center  mx-3 mt-3 px-5 py-2.5 text-sm font-medium  text-center text-white bg-blue-700 rounded-lg focus:ring-4 ">
         Publish post
     </button>

    </div>
  
}

function TextEditor({onChange}:{onChange:(e: ChangeEvent<HTMLTextAreaElement>)=>void}){
  return  <div className="mt-8 border-t border-l w-11/12">
     <div className="w-full mb-4">
         <div className="flex items-center justify-between px-3 py-2 border-b">
         <div className="px-4 py-2 bg-white rounded-b-lg w-full">
             <label  className="sr-only">Publish post</label>
            
             <textarea  onChange={onChange}   id="editor" rows={8} className="block w-full focus:outline-none px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required ></textarea>
         </div>
     </div>
     </div>
  </div>
  
}