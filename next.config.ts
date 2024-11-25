import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['shared.akamai.steamstatic.com'], // 허용할 도메인 추가
  },
  async headers() {
    return [
      {
        // 모든 API 경로에 대해 CORS 헤더 추가
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
