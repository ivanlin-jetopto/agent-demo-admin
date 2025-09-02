import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore certain Node.js modules that cause issues with webpack
      config.externals = [...(config.externals || []), 'handlebars'];
    }

    // Fix for Genkit/Firebase modules
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      },
    };

    return config;
  },
  serverExternalPackages: [
    'genkit',
    '@genkit-ai/core',
    '@genkit-ai/flow',
    '@genkit-ai/googleai',
  ],
};

export default nextConfig;
