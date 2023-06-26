/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    ENV: process.env.NODE_ENV || "development" || "production",
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
}

module.exports = nextConfig
