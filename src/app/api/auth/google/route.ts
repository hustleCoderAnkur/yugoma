import { NextResponse } from "next/server";

import { getGoogleAuthUrl } from "@/server/services/auth/getGoogleAuthUrl";

export async function GET() {
    try {
        const authUrl = getGoogleAuthUrl();

        return NextResponse.redirect(authUrl);
    } catch (error) {
        console.error("Google auth error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to initialize Google authentication.",
            },
            {
                status: 500,
            },
        );
    }
}