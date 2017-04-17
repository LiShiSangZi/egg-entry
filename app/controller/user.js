'use strict';

// exports.index = async() => {
//   console.log('====index====');
//   await this.validate({
//     id: 'id'
//   });
//   // will throw if invalid
//   // // or
//   // const errors = await this.validator.validate({
//   //   id: 'id'
//   // }, this.request.body);
// };

exports.index = function* () {
  console.log('======index======');
};

exports.info = async ctx => {
  ctx.body = {
    name: `hello`,
  };
};

exports.setting = async ctx => {
  console.log(ctx.session);
  ctx.body = {
    name: 'Done'
  };
}