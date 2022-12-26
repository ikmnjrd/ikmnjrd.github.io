// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (isServer) {
      // @ts-ignore
      // require('./src/scripts/generate-sitemap.js')
    }

    // config.resolve.alias['@components'] = path.join(__dirname, 'components');
    // config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
    return config
  },
}

module.exports = nextConfig
