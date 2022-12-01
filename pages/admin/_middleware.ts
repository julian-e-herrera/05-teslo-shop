import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import  { getToken } from 'next-auth/jwt';


export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    
    const session:any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    
    if (!session) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${requestedPage}`;
        return NextResponse.redirect(url);
    }

    
    const validRoles =['admin','super-user','SEO']
    
    if (!validRoles.includes(session.user.role)) {
        return NextResponse.redirect(`/`)
    }
    
    return NextResponse.next()
}
export const config = {
    matcher: ['/admin/:path*'],
};
export { default } from "next-auth/middleware"