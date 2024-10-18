/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME, // This will refer to the env variable
        port: "",
        pathname: "/**", // Allow any path
      },
    ],
  },
};

export default nextConfig;
