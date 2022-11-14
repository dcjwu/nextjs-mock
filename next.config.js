/** @type {import("next").NextConfig} */
const nextConfig = {
   async redirects () { // eslint-disable-line @typescript-eslint/explicit-function-return-type
      return [ {
         source: "/",
         destination: "/login",
         permanent: true
      } ]
   },
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: [ "ik.imagekit.io" ]
   }
}

module.exports = nextConfig
