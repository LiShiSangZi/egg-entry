'use strict';

// const AuthService = require('../service/auth');

const index = async() => {
  await this.validate({
    id: 'id'
  });
}

const login = async(ctx) => {
  if (false) { //ctx.session && ctx.session.user) {
    ctx.body = "Already Authorizated!";
  } else {
    try {
      const request = ctx.request.body;
      await ctx.service.auth.doAuth(request.username, request.password, ctx.keystone, ctx.domain);
    } catch (e) {
      console.log(e);
      ctx.throw(409);
    }
  }

  return;
};

const logout = async(ctx) => {
  return;
};

module.exports = {
  index,
  login,
  logout,
};
