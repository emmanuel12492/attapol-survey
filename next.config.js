/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    // Only enable Turbopack in development
    turbo: process.env.NODE_ENV === 'development'
  }
}