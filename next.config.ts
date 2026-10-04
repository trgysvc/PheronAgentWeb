import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
  },
  async redirects() {
    return [
      {
        source: "/resources",
        destination: "/resources/docs",
        permanent: true,
      },
      {
        source: "/resources/docs/architecture_overview",
        destination: "/resources/docs/wiki/architecture_overview",
        permanent: true,
      },
      {
        source: "/resources/docs/skill_vault",
        destination: "/resources/docs/wiki/skill_vault",
        permanent: true,
      },
      {
        source: "/resources/docs/native_tool_calling",
        destination: "/resources/docs/wiki/native_tool_calling",
        permanent: true,
      },
      {
        source: "/resources/docs/system_stability",
        destination: "/resources/docs/wiki/system_stability",
        permanent: true,
      },
      {
        source: "/resources/docs/v3_migration_guide",
        destination: "/resources/docs/wiki/v3_migration_guide",
        permanent: true,
      },
      {
        source: "/resources/docs/performance_optimization_report",
        destination: "/resources/docs/wiki/performance_optimization_report",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Content-Security-Policy is set per-request (with a nonce) in src/proxy.ts
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
