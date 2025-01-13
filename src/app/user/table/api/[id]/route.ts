import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

//delete
export async function DELETE (request: NextRequest,{params}:{params:Promise<{id:string}>}){

  
    try{
      //  const body = await request.json()
      const {id} = await params
    
      const updatedUser = await User.findByIdAndDelete(id,{new:true})
      return new NextResponse(JSON.stringify(updatedUser,{status : 200}))
     }catch(error){
      
      console.log('error',error);
  
     }
    }
    