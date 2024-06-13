import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  disable: true,
  // disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

// export default nextConfig;
export default withPWA(nextConfig);
