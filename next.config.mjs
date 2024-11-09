/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Apply COOP header with "same-origin" to all routes by default
          source: "/:path*",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin",
            },
          ],
        },
        {
          // Apply COOP header with "unsafe-none" to /signin to prevent popup issues
          source: "/",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "unsafe-none",
            },
          ],
        },
        
      ];
    },
    env: {
        GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      },
  };
  
  export default nextConfig;
  