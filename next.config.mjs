import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(new URL('.', import.meta.url).pathname, 'app'), // Adjust this path if necessary
    };
    return config;
  },
};

export default nextConfig;
