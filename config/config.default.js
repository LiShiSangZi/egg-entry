'use strict';

const glob = require('glob');
const path = require('path');

exports.keys = 'some secret hurr';

exports['session-memcached'] = {
  client: {
    host: '10.0.101.54',
    port: '11211',
    failOverServers: ['10.0.101.54:11211']
  }
};

exports.proxyworker = {
  port: 10086,
};

// TODO: Move this to CDN when deployed.

exports.static = {
  enable: true,
  dir: glob.sync('**/app/public', {
    cwd: path.join(__dirname, '../lib/plugin')
  }).map(fold => path.join(__dirname, '../lib/plugin', fold))
};
// END OF TODO.
exports.development = {
  enable: true,
  watchDirs: ['lib/plugin'],
};

exports.auth = {
  keystone: 'http://10.0.101.54:5000',
  domain: 'Default'
};
