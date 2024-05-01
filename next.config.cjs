/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
