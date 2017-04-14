'use strict';

const path = require('path');
const glob = require('glob');
module.exports = app => {
  const routerConfig = require(path.join(app.baseDir, 'router.json'));

  routerConfig.routers.forEach(o => {
    app[o.method](o.url, o.handler);
  });

  const pluginPath = path.join(__dirname, '..', 'lib', 'plugin');
  const res = glob.sync('**/app/router.js', {
    cwd: pluginPath
  }).forEach(shortPath => {
    const fullPath = path.join(pluginPath, shortPath);
    const settings = require(fullPath);
    if (settings.load) {
      settings.load(app);
    }
    if (settings.routers instanceof Array) {
      settings.routers.forEach(o => {
        app[o.method](o.url, o.handler);
      });
    }
  });

};
