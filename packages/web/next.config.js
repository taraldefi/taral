const withTM = require('next-transpile-modules')(
  ['taral-configuration', 'lib-shared','taral-contracts', 'lib-web', 'lib-stacks']
);

module.exports = withTM({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
});
