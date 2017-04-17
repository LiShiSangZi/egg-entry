'use strict';

const login = async(ctx) => {
  if (false) {//ctx.user) {
    ctx.body = "Already Authorizated!";
  } else {
    try {
      const request = ctx.request.body;
      const res = await ctx.service.keystone.auth.doAuth(request.username, request.password, ctx.keystone, ctx.domain);
      ctx.body = res;
    } catch (e) {
      ctx.throw(409);
    }
  }

  return;
};

const logout = async(ctx) => {
  return;
};

module.exports = {
  login,
  logout,
};
