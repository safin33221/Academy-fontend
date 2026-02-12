import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Enable production optimizations
  // swcMinify: true, 
  compress: true,
  poweredByHeader: false,

  // Image configuration (allow all remote images)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**", // allow all HTTP domains (not recommended for prod)
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Development origins
  allowedDevOrigins: [
    "192.168.56.1",
    "http://192.168.56.1:3000",
    "http://192.168.56.1",
    "http://192.168.0.102:3000",
    "*.local-origin.dev",
  ],

  // Experimental (optional, production safe)
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Headers (basic security hardening)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

