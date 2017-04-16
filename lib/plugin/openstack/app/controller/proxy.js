'use strict';

/**
 * Proxy the openstack API to client.
 */
async function proxy(ctx) {
  const req = ctx.request;
  const method = req.method;

  const reg = /\/proxy\/(\w*?)\/(.*)/;
  const result = reg.exec(req.path);
  if (result.length > 2) {
    const module = result[1];
    let left = `${result[2]}`;
    let endpoint;
    if (module == 'identity') {
      endpoint = ctx.keystone;
    } else {
      const remotes = ctx.remotes;
      const targetRemote = remotes[module];
      const region = ctx.region || 'RegionOne';
      const endpoints = targetRemote.remotes;
      endpoint = endpoints[region];
    }

    if (!endpoint) {
      ctx.throw(404);
    } else {
      const opt = {
        method: method,
        dataType: 'json',
        headers: {
          'X-Auth-Token': ctx.token,
          'Content-Type': 'application/json',
        }
      };
      
      if (req.body && Object.keys(req.body).length > 0) {
        opt.data = req.body;
      }
      if (req.query) {

        const keys = Object.keys(req.query);
        if (keys.length > 0) {
          const matrix = keys.map(key => `${key}=${req.query[key]}`);
          left = `${left}?${matrix}`;
        }
      }
      const result = await ctx.curl(`${endpoint}/${left}`, opt);
      if (result.status < 300) {
        ctx.body = result.data;
      } else {
        ctx.throw(result.status, result.data);
      }
    }
  }
}

module.exports = {
  proxy
}
