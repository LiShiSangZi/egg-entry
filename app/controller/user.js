'use strict';

exports.info = async ctx => {
  ctx.session.required = '123';
  ctx.body = {
    name: `hello ${ctx.isAuth}`,
  };
};