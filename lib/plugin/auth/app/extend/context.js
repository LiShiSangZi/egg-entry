'use strict';

function getAuthConfig(ctx) {
  if (ctx.app && ctx.app.config && ctx.app.config.auth) {
    return ctx.app.config.auth;
  }
  return {};
}
module.exports = {
  get keystone() {
    const config = getAuthConfig(this);
    return config.keystone;
  },

  get domain() {
    const config = getAuthConfig(this);
    return config.domain;
  }
};
