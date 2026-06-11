import { NextResponse } from "next/server"


export async function POST() {
    try {
        const response = NextResponse.json({
            success: true,
            message: "User Logout Successfuly"
        }, { status: 200 });

        response.cookies.delete("token");

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 500 })
    }
}
