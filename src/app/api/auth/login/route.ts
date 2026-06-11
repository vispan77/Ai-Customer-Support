import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user/user";
import jwt from "jsonwebtoken";
import dbConnect from "@/config/dbConnect";




export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        
        const { name, email, avatar } = await req.json();

        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required"
                },
                { status: 400 }
            );
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                avatar
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.NEXT_PUBLIC_JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully",
            data: user
        }, { status: 201 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60
        });

        return response;
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong"
            },
            { status: 500 }
        );
    }
}

