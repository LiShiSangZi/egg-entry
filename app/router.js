'use strict';

const path = require('path');
const glob = require('glob');

const is = require('is-type-of');
const utility = require('utility');

// function functionToMiddleware(func) {
//   const objectControllerMiddleware = async (ctx) => {
//     const r = func.call(this, ctx);
//     if (is.promise(r)) {
//       await r;
//     }
//   };
//   for (const key in func) {
//     if (utility.has(func, key)) {
//       objectControllerMiddleware[key] = func[key];
//     }
//   }
//   return objectControllerMiddleware;
// }

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
    if (settings instanceof Array) {
      settings.forEach(o => {
        app[o.method](o.url, functionToMiddleware(o.handler));
      });
    }
  });

};
