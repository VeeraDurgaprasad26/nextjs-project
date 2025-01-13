//get by id
import User from '@/app/models/User'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async(request:NextRequest,{params }: {params:Promise<{id:string}>})=>{
  const {id} = await params
    const userById =await User.findById({_id:id})
     return new NextResponse(JSON.stringify(userById))

}

//PUT

export async function PUT (request: NextRequest,{params}:{params:Promise<{id:string}>}){

  
  try{
    const {id} = await params
     const body = await request.json()
      
  
    const updatedUser = await User.findByIdAndUpdate(id,body,{new:true})
    return new NextResponse(JSON.stringify(updatedUser,{status : 200}))
   }catch(error){
    
    console.log('error',error);

   }
  }