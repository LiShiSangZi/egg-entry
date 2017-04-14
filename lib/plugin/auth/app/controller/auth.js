'use strict';

const login = async ctx => {
  console.log('login.....');
  console.log(ctx);
};

const logout = async(ctx) => {
  console.log('logout......');
};

module.exports = {
  login,
  logout,
};
