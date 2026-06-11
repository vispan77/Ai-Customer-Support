import dbConnect from "@/config/dbConnect";
import Setting from "@/models/setting/setting";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { ownerId } = await req.json();

        if (!ownerId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "owner id is missing"
                },
                { status: 400 }
            )
        }

        const setting = await Setting.findOne({ ownerId });

        return NextResponse.json(
            {
                success: true,
                message: "Get the business details",
                data: setting
            },
            { status: 200 }
        )


    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while getting file"
            },
            { status: 500 }
        )
    }
}