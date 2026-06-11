import { NextRequest, NextResponse } from "next/server";


export function proxy(req: NextRequest) {
    try {
        const token = req.cookies.get("token");

        if (!token) {
            return NextResponse.redirect(
                new URL("/", req.url)
            )
        }


        return NextResponse.next();

    } catch (error) {
        console.log(error)
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/embed/:path*"]
};