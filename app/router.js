'use strict';

const path = require('path');
const glob = require('glob');

const is = require('is-type-of');
const utility = require('utility');

function functionToMiddleware(func) {
  const objectControllerMiddleware = function*() {
    const r = func.call(this, this);
    if (is.generator(r) || is.promise(r)) {
      yield r;
    }
  };
  for (const key in func) {
    if (utility.has(func, key)) {
      objectControllerMiddleware[key] = func[key];
    }
  }
  return objectControllerMiddleware;
}

module.exports = app => {

  app.get('/user/:id', 'user.info');
  app.addIgnoreList('/user/:id');
  
  const pluginPath = path.join(__dirname, '..', 'lib', 'plugin');
  const res = glob.sync('**/app/router.js', {
    cwd: pluginPath
  }).forEach(shortPath => {
    const fullPath = path.join(pluginPath, shortPath);
    const settings = require(fullPath);
    if (settings instanceof Array) {
      settings.forEach(o => {
        if (o.ignoreAuth) {
          app.addIgnoreList(o.url);
        }
        app[o.method](o.url, functionToMiddleware(o.handler));
      });
    }
  });

};
