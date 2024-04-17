/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // esmExternals: 'loose',
    // serverComponentsExternalPackages: ['vscode-oniguruma', 'shiki'],
  },
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
