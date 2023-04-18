/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require('@plaiceholder/next');

module.exports = withPlaiceholder({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'easypost-files.s3.us-west-2.amazonaws.com',
      },
    ],
  },
});
