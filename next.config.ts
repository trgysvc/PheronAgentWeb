import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
