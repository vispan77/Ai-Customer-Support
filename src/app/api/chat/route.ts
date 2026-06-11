import dbConnect from "@/config/dbConnect";
import generateResponse from "@/config/openRouer";
import Setting from "@/models/setting/setting";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
    return NextResponse.json({}, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json();

        if (!message || !ownerId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Message is not given'
                },
                { status: 400 }
            )
        }
        await dbConnect();
        const setting = await Setting.findOne({ ownerId });

        if (!setting) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Setting not found'
                },
                { status: 404 }
            )
        }

        const KNOWLEDGE = `
        business name- ${setting.businessName || "not provided"}
        supportEmail- ${setting.supportEmail || "not provided"}
        knowledge- ${setting.knowledge || " not provided"}
        `


        const prompt = `
        You are a professional customer support assistant for this business.

        Use ONLY the information provided below to answer the customer's question.
        You may rephrase, summarize, or interpret the information if needed.
        Do NOT invent new policies, prices, or promises.



        --------------------
        BUSINESS INFORMATION
        --------------------
        ${KNOWLEDGE}

        --------------------
        CUSTOMER QUESTION
        --------------------
        ${message}

        --------------------
        ANSWER
        --------------------
        `;

        const responseFromAi = await generateResponse(prompt);

        let finalMessage = "";
        try {
            const parsedAnswer = JSON.parse(responseFromAi);
            finalMessage = parsedAnswer.answer || parsedAnswer.response || responseFromAi;
        } catch (e) {
            // If AI returns plain text instead of JSON
            finalMessage = responseFromAi;
        }

        console.log(finalMessage);

        const response = NextResponse.json(
            {
                success: true,
                message: finalMessage
            },
            { status: 200 }
        )

        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return response;


    } catch (error) {
        console.log(error)
        const response = NextResponse.json(
            {
                success: false,
                message: 'Something went wrong while creating chat'
            },
            { status: 500 }
        )

        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return response;
    }
}