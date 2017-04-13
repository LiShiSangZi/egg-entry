'use strict';

module.exports = app => {
  const index = app.config.coreMiddleware.indexOf('session');
  if (index >= 0) {
    app.config.coreMiddleware.splice(index + 1, 0, 'auth');
  }
};
