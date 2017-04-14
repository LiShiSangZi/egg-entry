'use strict';

const Auth = require('./controller/auth');
const path = require('path');
const is = require('is-type-of');
const utility = require('utility');
// wrap the method of the object, method can recieve ctx as it's first argument
function wrapObject(obj, path) {
  const keys = Object.keys(obj);
  const ret = {};
  for (const key of keys) {
    if (is.function(obj[key])) {
      const names = utility.getParamNames(obj[key]);
      if (names[0] === 'next') {
        throw new Error(`controller \`${key}\` should not use next as argument from file ${path}`);
      }
      ret[key] = functionToMiddleware(obj[key]);
    } else if (is.object(obj[key])) {
      ret[key] = wrapObject(obj[key], path);
    }
  }
  return ret;

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
}
module.exports = {
  "routers": [{
    "method": "post",
    "ignoreAuth": true,
    "url": "/auth/login",
    "handler": 'auth.login'
  }, {
    "method": "get",
    "url": "/auth/logout",
    "handler": 'auth.logout'
  }],
  "load": app => {
    const dir = path.join(__dirname, 'controller');
    app.loader.loadToApp(dir, 'controller', {
      "initializer": (obj, opt) => {
        const o = wrapObject(obj, opt.path);
        return o;
      },
      "override": false
    });

  }
};


// module.exports = app => {
//   console.log('auth/router.js');
//   app.post('/auth/login', 'auth.login');
// }
