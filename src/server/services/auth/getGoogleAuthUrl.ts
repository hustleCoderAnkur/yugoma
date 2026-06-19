import { GOOGLE_SCOPES } from "@/lib/googleScopes";

export function getGoogleAuthUrl() {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
        scope: GOOGLE_SCOPES.join(" "),
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}