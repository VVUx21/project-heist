/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.unsplash.com","res.cloudinary.com"],
      },
  remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Match all paths under the hostname
            },
        ],
};

export default nextConfig;