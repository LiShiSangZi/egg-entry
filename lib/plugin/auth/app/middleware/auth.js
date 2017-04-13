'use strict';

module.exports = options => {
  return async(ctx, next) => {
    if (ctx.session && ctx.session.user) {
      await next();
    } else {
      ctx.throw(401);
    }
  }
}
