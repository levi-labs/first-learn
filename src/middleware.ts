import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {

    const isLogin = true;

    if (isLogin) {
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL('/', req.url));
    }
   
}

export const config = {
    matcher: [
        '/product/:path*',
    ],
}