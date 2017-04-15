'use strict';

const Auth = require('./controller/auth');
const path = require('path');

module.exports = [{
  "method": "post",
  "ignoreAuth": true,
  "url": "/auth/login",
  "handler": Auth.login
}, {
  "method": "get",
  "url": "/auth/logout",
  "handler": Auth.logout
}];
