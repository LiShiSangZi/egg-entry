'use strict';

exports.info = async ctx => {
  ctx.session.user = '123';
  ctx.body = {
    name: `hello ${ctx.isAuth}`,
  };
};

exports.setting = async ctx => {
  console.log(ctx.session);
  ctx.body = {
    name: 'Done'
  };
}
