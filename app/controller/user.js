'use strict';

exports.info = async ctx => {
  ctx.body = {
    name: `hello ${ctx.isAuth}`,
  };
};