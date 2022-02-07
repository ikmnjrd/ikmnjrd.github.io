const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias['@components'] = path.join(__dirname, 'components')
    return config
  },
}
