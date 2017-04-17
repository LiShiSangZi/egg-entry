'use strict';

const path = require('path');
const pathToRegexp = require('path-to-regexp');

module.exports = (options, app) => {
  return async(ctx, next) => {
    let ignoreAuth = /\/public\//.test(ctx.path) || (ctx.session && ctx.session.user);
    if (!ignoreAuth) {
      ignoreAuth = app.isIgnorePath(ctx.path);
    }
    if (ignoreAuth) {
      await next();
    } else {
      ctx.throw(401);
    }
  }
}
