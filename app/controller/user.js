'use strict';

exports.info = async ctx => {
  ctx.body = {
    name: `hello`,
  };
};

exports.setting = async ctx => {
  ctx.body = {
    name: 'Done'
  };
}