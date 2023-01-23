/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shdw-drive.genesysgo.net',
        port: '',
        pathname: '/EGtxrUd5pxsXBpTU3wy7DkHa32PyD4jMe2Rw7kpwaPFd/**',
      },
    ],
  },
}

module.exports = nextConfig
