const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap.js')
    }
    config.resolve.alias['@components'] = path.join(__dirname, 'components');
    config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
    return config
  },
}
