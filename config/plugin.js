'use strict';

const path = require('path');

exports.session = true;

exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/auth'),
};
