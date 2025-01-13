'use client'

import { useEffect, useState } from "react"

import axios from "axios";


import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";



const TableData = () => {
const [data, setdata] = useState([])
const [loading, setLoading] = useState(true);
const router = useRouter()

useEffect(()=>{

    
getData()

},[])

const getData = async ()=>{ 
  
  const response = await axios.get('/user/table/api')
setdata(response.data)
setLoading(false)   
} 


const handleEdit = (id: string) => {
  router.push(`/user/editpage/${id}`);
};


  const handleDelete = async(id: string) => {
    try {
    const response =  await axios.delete(`/user/table/api/${id}`);
    toast.success("Deleted successfully!");
  
    console.log(response);
    
    getData()
          
    } catch (error) {
      console.error("Error deleting the item:", error);
    }

  };

if (loading){
  return <h1 style={{textAlign:"center", fontSize:30, fontWeight:"bold", marginBottom:40}}>...Loading</h1>
}
const handlelogout = async () => {
  try {
    // Call the backend API to clear the token cookie
    await axios.post('/user/logout/api');
    toast.success("Logged out successfully!");
    // Redirect to login page
    router.push('/user/login');
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Logout failed. Please try again.");
  }
};

  return (
    <div >
        
        <ToastContainer position="top-center" autoClose={3000} />
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.NO
                </th>
                <th scope="col" className="px-6 py-3">
                    NAME
                </th>
                <th scope="col" className="px-6 py-3">
                    EMAIL
                </th>
                <th scope="col" className="px-6 py-3">
                    PASSWORD
                </th><th scope="col" className="px-6 py-3">
                   ACTION BUTTONS
                </th>

               
            </tr>
        </thead>
        <tbody>
            {data.map((item : any , index) =>(
            <tr key ={index}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {index+1}
                </th>
                <td className="px-6 py-4">
                   {item?.name|| 'N/A'}  
                </td>

                <td className="px-6 py-4">
                   {item.email}
                </td>
                <td className="px-6 py-4">
                  {item.password}
                </td>
                <td className="px-6 py-4">
                <button
                    onClick={() => handleEdit(item._id)}
                    className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
                
            </tr>
           
            ))}
        </tbody>
    </table>
</div>
<div className="flex items-center justify-center h-screen">
<div className="relative h-screen">
  <button
    onClick={handlelogout}
    className="absolute top-4 right-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
  >
    Logout
  </button>
</div>

</div>

    </div>
  )
}

export default TableData