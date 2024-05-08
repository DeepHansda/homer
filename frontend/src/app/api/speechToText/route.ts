import { StreamingTextResponse } from "ai";
import { createReadStream, unlinkSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const body = await request.formData();
        const audio = body.get("audio");

        const formData = new FormData();
        formData.append("audio", audio);

        const fetchOptions = {
            method: "POST",
            body: formData,
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        };

        const response = await fetch("https://ideally-popular-dove.ngrok-free.app/proxy/8000/chat", fetchOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        // Retrieve the ReadableStream from the response
        const streamData = response.body;

        // Return a streaming response
        return new Response(streamData, { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse({
            status: 500,
            text: "Internal Server Error",
        });
    }
}

export async function GET() {
    try {
        return NextResponse.json({ "message": "hello world" })
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}