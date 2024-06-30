/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rukminim2.flixcart.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images-cdn.ubuy.co.in",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.samsung.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                port: "",
                pathname: "/**",
            },
        ]
    }
};

module.exports = nextConfig;