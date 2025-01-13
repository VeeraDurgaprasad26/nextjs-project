'use client';

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EditFormData = () => {
  const[name,setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { id } = useParams(); 
  const router = useRouter()

  useEffect(() => {
    const getUserData = async (id) => {
      try {
        const response = await axios.get(`/user/editpage/api/${id}`);
        console.log(response.data);
        
        const { name,email, password } = response.data;
        setName(name || "");
        setEmail(email || "");
        setPassword(password || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData(id);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    

    const userData = { name,email, password };

    try {
      const response = await axios.put(`/user/editpage/api/${id}`, userData);
      console.log("Form submitted successfully", response.data);
      setTimeout(() => {
        router.push("/user/table");
      }, 3000);
      toast.success("Form submitted successfully!");
      setName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
   <>
   <div style={{marginTop: 100}}>
      
      <h1 style={{textAlign:"center", fontSize:30, fontWeight:"bold", marginBottom:40}}>Edit Form</h1>
    <ToastContainer position="top-center" autoClose={3000} />
    <form  className="max-w-sm mx-auto" onSubmit={handleSubmit}>
    <div className="mb-5" >
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Your name
        </label>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter your name"
          required
        />
      </div>
      <div className="mb-5" >
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Your email
        </label>
        <input
          type="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Your password
        </label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
    </div>
    </>
  );
};

export default EditFormData;
