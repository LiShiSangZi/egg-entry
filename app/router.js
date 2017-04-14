'use strict';

const path = require('path');
module.exports = app => {

  const routerConfig = require(path.join(app.baseDir, 'router.json'));

  routerConfig.routers.forEach(o => {
    app[o.method](o.url, o.handler);
  });
};
