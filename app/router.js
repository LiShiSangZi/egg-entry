'use strict';

// app/router.js
module.exports = app => {
  app.get('/user/:id', 'user.info');
};
