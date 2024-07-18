import { SignupInput } from "@nitin2024/medium-common";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup" | "signin"}) => {
  const navigate= useNavigate();
  const [postInputs,setPostInputs]  = useState<SignupInput>({
    name:"",
    username:"",
    password:""

  });

  async function  sendRequest  (){
    try {
     const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
      const jwt = response.data;
    
      localStorage.setItem("token",jwt)
      console.log(jwt)

      navigate("/blogs")
    } catch (error) {
      alert("Error while signup ")
        //alert the user that request failed  
    }
  }


  return <div className="h-screen flex justify-center flex-col">
       <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
                Create an account
            </div> 
            <div className="text-slate-400 pt-2">
             {type==="signin" ? "Don't have an account ?" : "Already have an account ?"}
              <Link className="text-black underline" to={type==="signin"?"/signup":"/signin"}>{type === "signin"? "Signup":"Signin"}</Link>
            </div>
          </div>
          <div className="pt-6">
         {type ==="signup"?<LabelledInput placeholder="Nitin " label="Name" onChange={(e)=>{
            setPostInputs(c=>({
              ...c,
              name:e.target.value
            }))
          }} />:null} 

          <LabelledInput placeholder="Nitin@gmail.com " label="Username" onChange={(e)=>{
            setPostInputs(c=>({
              ...c,
              username:e.target.value
            }))
          }} />

          <LabelledInput placeholder="**********" type={"Password"} label="Password" onChange={(e)=>{
            setPostInputs(c=>({
              ...c,
              password:e.target.value
            }))
          }} />
          <button onClick={sendRequest}  type="button" className="text-white text-lg bg-gray-800 hover:bg-gray-900 focus:outline-none mt-4 focus:ring-4 focus:ring-gray-300 font-medium rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 w-full dark:border-gray-700">{type=="signup"? "Signup":"Signin"}</button> 
{/* 

    <button className="flex items-center rounded-full bg-white dark:bg-gray-900 border border-gray-300  shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:text-black dark:text-white w-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
        <span className="w-full">Continue with Google</span>
    </button> */}



      
         

          </div>
       </div>
       </div>
  </div>
  
}






interface LabelledInputType{
  label:string,
  placeholder:string,
  onChange :(e:any)=>void
  type?: string
}

function LabelledInput({label,placeholder,type ,onChange}:LabelledInputType){
  return <div>
           <label  className="block mb-2 text-bold mt-2 text-ls font-medium text-black ">{label}</label>
           <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border rounded-full border-gray-300 text-gray-900 text-sm  focus:ring-blue-500  focus:border-blue-500  block w-full p-2.5 " placeholder={placeholder} required />
</div>
}


// interface ButtonTypes{
//   label:string,
//   onClick:any
// }

// export function SimpleButton({type,onClick}:ButtonTypes){
//   return <div>
//     <button onClick={onClick} type="button" className="text-white text-lg bg-gray-800 hover:bg-gray-900 focus:outline-none mt-4 focus:ring-4 focus:ring-gray-300 font-medium rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 w-full dark:border-gray-700">{type =="signup"? "Signup":"Signin"}</button>

//   </div>
// }
export function GoogleSignButton() {
  return (
    <div>
      <button
        type="button"
        className="text-white w-full text-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none rounded-full focus:ring-[#4285F4]/50 font-medium  text-sm px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mb-2"
      >
        <svg
          className="w-4 h-4 mr-auto"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fillRule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clipRule="evenodd"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
