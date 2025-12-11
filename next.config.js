/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    
    serverActions: {
      bodySizeLimit: '2mb', 
      // optional, if you want to keep this limit
    },
      instrumentationHook: true,
    // Removed invalid key
  },
  // New key for external packages
  serverExternalPackages: ['mongoose', 'cheerio', 'axios'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
    ],
  },
  turbopack: {
    root: './', // ensures correct project root if multiple lockfiles exist
  },
}

module.exports = nextConfig;
