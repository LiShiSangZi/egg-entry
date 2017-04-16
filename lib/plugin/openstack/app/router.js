'use strict';

const Proxy = require('./controller/Proxy');

module.exports = [{
  "method": "all",
  "url": /\/proxy\/(\w+)\/(.+)/,
  "handler": Proxy.proxy
}];
