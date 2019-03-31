'use strict';

var path = require('path');

/**
 * Will return the path and default myntcore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to myntcoin database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }
  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['myntd', 'web'],
      servicesConfig: {
        myntd: {
          spawn: {
            datadir: options.datadir || path.resolve(process.env.HOME, '.mynt'),
            exec: path.resolve(__dirname, '../../bin/myntd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
