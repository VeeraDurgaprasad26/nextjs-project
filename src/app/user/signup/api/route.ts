// import { NextRequest, NextResponse } from "next/server";
// import User from "../../../models/User"
// export const POST = async(request:NextRequest) => {
//   try{

//   const userData = await request.json()

//   console.log(userData);

//   const userDetails = new User ({
//     name :userData.name,
//     email:userData.email,
//     password:userData.password
//   })
//   console.log(userDetails);
  
//   await userDetails.save()

//   return new NextResponse(JSON.stringify({sucess:true}),{status:200})

 
// }
// catch(error){
// console.log("Error",error);
// return new NextResponse(JSON.stringify({sucess:false}),{status:500})

// }
// }
import { NextRequest, NextResponse } from "next/server";

import User from "../../../models/User";
import bcryptjs from 'bcryptjs';

export const POST = async (request: NextRequest) => {
  try {
   
    const userData = await request.json();

 
    if (!userData.name || !userData.email || !userData.password) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(userData.password, saltRounds);

    
    const userDetails = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword, 
    });

  
    await userDetails.save();

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error.message);
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
};
