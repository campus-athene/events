/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
