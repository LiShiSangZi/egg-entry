'use strict';

const path = require('path');

exports.session = true;

exports.memcached = {
  enable: true,
  path: path.join(__dirname, '../../egg-memcached'),
}

exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/auth'),
};
