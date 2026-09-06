/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

module.exports = nextConfig;
