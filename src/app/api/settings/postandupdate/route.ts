import { NextRequest, NextResponse } from "next/server";
import Setting from "@/models/setting/setting";
import dbConnect from "@/config/dbConnect";

export async function POST(req: NextRequest) {
    try {

        await dbConnect();

        const { ownerId, businessName, supportEmail, knowledge } = await req.json();
        if (!ownerId || !businessName || !supportEmail || !knowledge) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 }
            )
        }

        const setting = await Setting.findOneAndUpdate(
            { ownerId },
            { ownerId, businessName, supportEmail, knowledge },
            { new: true, upsert: true }
        )

        return NextResponse.json(
            {
                success: true,
                message: "Business setting is created successfully",
                data: setting
            },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong"
            },
            { status: 500 }
        )
    }
}