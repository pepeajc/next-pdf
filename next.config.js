/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    profiler: true,
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'tools.rankios.com' }],
          destination: 'https://www.tools.rankios.com/:path*',
          permanent: true
        },
      ];
    },
  }
  
  module.exports = nextConfig
