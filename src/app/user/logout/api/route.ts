import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const response = NextResponse.json({
      success: true,
      message: "User logged out successfully",
    }, { status: 200 });

    
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, 
    });

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({
      success: false,
      error: "Error logging out",
    }, { status: 500 });
  }
};
