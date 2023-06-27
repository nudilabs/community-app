/** @type {import('next').NextConfig} */
const nextConfig = {
  // config images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
    ],
  },
};

module.exports = nextConfig;
