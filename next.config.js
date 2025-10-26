/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 确保图片优化正常工作
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
