type GoogleIdTokenPayload = {
    email?: string;
    name?: string;
    sub?: string;
};

export function decodeGoogleIdToken(
    idToken: string,
): GoogleIdTokenPayload {
    const parts = idToken.split(".");

    if (parts.length !== 3) {
        throw new Error("Invalid id_token format");
    }

    const payloadBase64 = parts[1]!
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const decoded = Buffer.from(
        payloadBase64,
        "base64",
    ).toString("utf-8");

    return JSON.parse(decoded) as GoogleIdTokenPayload;
}