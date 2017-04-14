'use strict';

const path = require('path');
const pathToRegexp = require('path-to-regexp');

module.exports = (options, app) => {
  const routerConfig = require(path.join(app.baseDir, 'router.json'));
  const ignoreList = routerConfig.routers.filter(o => {
    return o.ignoreAuth;
  }).map(o => pathToRegexp(o.url));
  return async(ctx, next) => {
    let ignoreAuth = ctx.session && ctx.session.user;
    if (!ignoreAuth) {
      ignoreList.some(reg => {
        if (reg.test(ctx.path)) {
          ignoreAuth = true;
          return true;
        }
      });
    }
    if (ignoreAuth) {
      await next();
    } else {
      ctx.throw(401);
    }
  }
}
