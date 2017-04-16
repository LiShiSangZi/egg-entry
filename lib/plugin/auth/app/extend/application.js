'use strict';

const is = require('is-type-of');
const pathToRegexp = require('path-to-regexp');

const ignoreList = [];

module.exports = {
  addIgnoreList: (pattern) => {
    if (is.regExp(pattern)) {
      ignoreList.push(pattern);
    } else if (is.string(pattern)) {
      ignoreList.push(pathToRegexp(pattern));
    }
  },
  isIgnorePath: (path) => {
    let ignoreAuth = false;
    ignoreList.some(reg => {
      if (reg.test(path)) {
        ignoreAuth = true;
        return true;
      }
    });
    return ignoreAuth;
  },
};
