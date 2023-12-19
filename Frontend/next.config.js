/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:8000",
    // API_URL: 'https://api.escuelait.com',
  },
};

module.exports = nextConfig;
