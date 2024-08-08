import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface blog {
    content: string;
    title: string;
    author: {
      name: string;
    };
    id: number;
    comment: {
      id: number;
      content: string;
      user: {
        name: string;
      };
    }[];
    tags:{
      id:number,
      tag:string
    }[]
  }
  

export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<blog>(); 

    useEffect(()=>{
       axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
       })
       .then((response)=>{
            setBlog(response.data.blog);
            setLoading(false)
       })
    },[id])

    return{
        loading,
        blog
    }

 
}






export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<blog[]>([]); 

    useEffect(()=>{
       axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
       })
       .then((response)=>{
            setBlogs(response.data.blog);
            setLoading(false)
       })
    },[])

    return{
        loading,
        blogs
    }
}   