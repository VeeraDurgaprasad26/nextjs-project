// import User from '@/app/models/User';
// import { NextRequest, NextResponse } from 'next/server';
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// const POST = async (request: NextRequest) => {
//     try {
//         const loginDetails = await request.json();
//         const { email, password } = loginDetails;

//         if (!email || !password) {
//             return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//         }

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 404 });
//         }

//         // Check password validity
//         const validPassword = await bcryptjs.compare(password, user.password);
//         if (!validPassword) {
//             return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//         }

//         // Create and assign a JWT token
//         const tokenData = {
//             id: user._id,
//             email: user.email,
//         };

//         if (!process.env.TOKEN_SECRET) {
//             throw new Error("TOKEN_SECRET is not defined");
//         }

//         const generatedToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

//         // Create response with token in HTTP-only cookie
//         const response = NextResponse.json({ message: "User login successful", success: true }, { status: 200 });
//         response.cookies.set("token", generatedToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        
//         return response;
//     } catch (error) {
//         console.error("Error handling user login: ", error);
//         return NextResponse.json({ error: "Error handling user login" }, { status: 500 });
//     }
// };

// export default POST;
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

 export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                error: "Email and password are required",
            }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User does not exist",
            }, { status: 404 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                success: false,
                error: "Invalid password",
            }, { status: 400 });
        }

        const tokenData = { id: user._id, email: user.email };

        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET is not defined");
        }

        const generatedToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        const response = NextResponse.json({
            success: true,
            message: "User login successful",
        }, { status: 200 });

        response.cookies.set("token", generatedToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
        });

        return response;
    } catch (error) {
        console.error("Error handling user login: ", error);
        return NextResponse.json({
            success: false,
            error: "Error handling user login",
        }, { status: 500 });
    }
};

