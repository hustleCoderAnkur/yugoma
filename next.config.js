import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.newsweek.com",
            },
            {
                protocol: "https",
                hostname: "www.activtrak.com",
            },
        ],
    },
};

export default config;