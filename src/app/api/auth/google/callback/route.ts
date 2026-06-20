import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { exchangeGoogleCode } from "@/server/services/auth/exchangeGoogleCode";

export async function GET(request: NextRequest) {
    try {
        const code = request.nextUrl.searchParams.get("code");

        if (!code) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing authorization code",
                },
                { status: 400 }
            );
        }

        const tokens = await exchangeGoogleCode(code);

        return NextResponse.json({
            success: true,
            tokens,
            email: tokens.email,
            name: tokens.name,
        });
    } catch (error) {
        console.error("Google callback error:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            { status: 500 }
        );
    }
}