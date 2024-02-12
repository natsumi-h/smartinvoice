/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smartinvoice-gacapstone.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
