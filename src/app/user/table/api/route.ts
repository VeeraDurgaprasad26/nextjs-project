import User from "@/app/models/User";
import { NextResponse } from "next/server";

export const GET = async() => {
    try{
      const users = await User.find({})
      console.log(users);
      
    
       return new NextResponse(JSON.stringify(users))}
       catch(error){
        console.log("Error",error);
    
        
         }
    }



    