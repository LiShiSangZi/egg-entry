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
const paths = glob.sync('**/app/public', {
  cwd: path.join(__dirname, '../lib/plugin')
}).map(fold => path.join(__dirname, '../lib/plugin', fold));

exports.static = {
  enable: true,
  dir: paths
};
// END OF TODO.

exports.development = {
  enable: true,
  watchDirs: ['../lib/plugin', '../../egg-async-validator/app'],
};

exports.auth = {
  keystone: 'http://10.0.101.54:5000',
  domain: 'Default'
};
