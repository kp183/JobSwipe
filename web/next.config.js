/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['via.placeholder.com'],
  },
  // Remove basePath and assetPrefix for GitHub Pages
  // GitHub Pages will serve from the root of the deployed site
}

module.exports = nextConfig