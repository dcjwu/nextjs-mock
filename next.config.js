/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["gurureal-mock.imgix.net"]
  }
}

module.exports = nextConfig
