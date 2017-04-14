'use strict';

const path = require('path');

exports.session = true;

exports.proxyworker = {
  enable: true,
  package: 'egg-development-proxyworker',
};

exports['session-memcached'] = {
  enable: true,
  package: 'egg-session-memcached'
};

exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/auth'),
};

exports.security = {
  enable: false
};
