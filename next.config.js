/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Only enable Turbopack in development
    turbo: process.env.NODE_ENV === 'development'
  }
}

export default nextConfig