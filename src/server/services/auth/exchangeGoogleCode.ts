type GoogleTokenResponse = {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token?: string;
};

export async function exchangeGoogleCode(
    code: string,
): Promise<GoogleTokenResponse> {
    const response = await fetch(
        "https://oauth2.googleapis.com/token",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type: "authorization_code",
            }),
        },
    );

    if (!response.ok) {
        const errorData = await response.text();

        console.log("GOOGLE TOKEN ERROR:");
        console.log(errorData);

        throw new Error(errorData);
    }

    const data = (await response.json()) as GoogleTokenResponse;
    return data
}