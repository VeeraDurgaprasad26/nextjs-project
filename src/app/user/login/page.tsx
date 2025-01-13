'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";

 const LoginFormData = () => {
  const[email,setemail] =useState("");
  const[password,setpassword] =useState("");
  const router = useRouter();

  const handleSubmit = async(e : any)=>{
    e.preventDefault();
    const userData = {
      email: email,
      password:password
    }
    console.log(userData);
    
    try{
const response = await axios.post("/user/login/api", userData)
console.log('Form submitted successfully', response.data);
 toast.success("Form submitted successfully!");
 setTimeout(() => {
  router.push("/user/table");
}, 3000);
       setemail("");
      setpassword("");
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error("Error submitting form. Please try again.");
    }
    }
  return (
    <>
    
    <ToastContainer position="top-center" autoClose={3000} />
    <div style={{marginTop: 100}}>
      
      <h1 style={{textAlign:"center", fontSize:30, fontWeight:"bold", marginBottom:40}}>Login Form</h1>
       
<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
    <input type="email" value={email} id="email" onChange={(e)=>setemail(e.target.value)}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
    <input type="password" value={password} id="password" onChange={(e)=>setpassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>

</>

  )

}

export default LoginFormData

