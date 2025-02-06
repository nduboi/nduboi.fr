let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/sitemap.xml',
  //       destination: '/api/sitemap.xml',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/android-chrome-192x192.png',
  //       destination: '/build/img/android-chrome-192x192.png',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/android-chrome-512x512.png',
  //       destination: '/build/img/android-chrome-512x512.png',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/apple-touch-icon.png',
  //       destination: '/build/img/apple-touch-icon.png',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/favicon-16x16.png',
  //       destination: '/build/img/favicon-16x16.png',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/favicon-32x32.png',
  //       destination: '/build/img/favicon-32x32.png',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/site.webmanifest',
  //       destination: '/build/img/site.webmanifest',
  //       permanent: true,
  //     },
  //     {
  //       source: '/build/img/favicon.ico',
  //       destination: '/build/img/favicon.ico',
  //       permanent: true,
  //     },
  //   ];
  // },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
