import { generateOAuthUrl } from "corsair/oauth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { corsair } from "@/server/corsair";

const REDIRECT_URI = `${process.env.APP_URL}/api/auth`;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const plugin = searchParams.get("plugin");
    const tenantId = searchParams.get("tenantId");

    if (!plugin) {
        return NextResponse.json(
            { error: "Missing plugin param" },
            { status: 400 },
        );
    }

    if (!tenantId) {
        return NextResponse.json(
            { error: "Missing tenantId param" },
            { status: 401 },
        );
    }

    const { url, state } = await generateOAuthUrl(
        corsair,
        plugin,
        {
            tenantId,
            redirectUri: REDIRECT_URI,
        },
    );

    const response = NextResponse.redirect(url);

    response.cookies.set("oauth_state", state, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
    });

    return response;
}