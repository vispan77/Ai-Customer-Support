import getUser from "@/helperFucnction/getUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unathorized"
            }, { status: 401 })
        }

        const user = await getUser(token);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Token is invalid"
            }, { status: 401 })
        }

        return NextResponse.json({
            success: true,
            message: "User found successfully",
            data: user
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "User not found "
        }, { status: 500 })
    }
}