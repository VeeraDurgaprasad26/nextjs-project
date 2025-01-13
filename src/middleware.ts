import { NextRequest, NextResponse } from 'next/server';



export function middleware(request : NextRequest) {

const path = request.nextUrl.pathname;

const publicpaths = path === '/' || path === '/user/login' || path === '/user/signup' ;
    const token = request.cookies.get("token")?. value || "";
    if(publicpaths && token) {
        return NextResponse.redirect (new URL('/user/table',request.nextUrl))
    
    }
    if(!publicpaths && !token) {
        return NextResponse.redirect (new URL('/user/login',request.nextUrl))
    
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/user/login", "/user/table","/user/signup", "/user/editpage"]
};
