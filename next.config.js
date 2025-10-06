/** @type {import('next').NextConfig} */
const nextConfig = {
  // For production deployment

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com'
      },
      {
        protocol: 'https',
        hostname: 'ugc.same-assets.com'
      }
    ]
  },

  // Enable experimental features for better Netlify compatibility
  serverExternalPackages: ['@supabase/supabase-js'],

  experimental: {
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'enneagram-test'
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
