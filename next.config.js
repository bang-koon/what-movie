// next config
/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "file.koreafilm.or.kr",
      },
    ],
  },
};

module.exports = nextConfig;
