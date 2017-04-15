'use strict';

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

exports.auth = {
  keystone: 'http://10.0.101.54:5000',
  domain: 'Default'
};
