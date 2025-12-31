/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['via.placeholder.com'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/JobSwipe' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/JobSwipe' : '',
}

module.exports = nextConfig