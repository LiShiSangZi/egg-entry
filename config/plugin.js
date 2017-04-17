'use strict';

const path = require('path');
const glob = require('glob');

exports.session = true;

exports.proxyworker = {
  enable: true,
  package: 'egg-development-proxyworker',
};

exports['session-memcached'] = {
  enable: true,
  package: 'egg-session-memcached'
};

// exports.validate = {
//   enable: true,
//   package: 'egg-async-validator',
// };

const files = glob.sync('plugin/**/app/public', {
  cwd: path.join(__dirname, '..', 'lib'),
});

// exports.static = {
//   prefix: '/public/',
//   dir: files.map(file => path.join(__dirname, '..', 'lib', file)),
// };


exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/auth'),
};

exports.static = true;

exports.openstack = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/openstack'),
}

exports.security = {
  enable: false
};
