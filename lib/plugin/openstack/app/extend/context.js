'use strict';

function getAuthConfig(ctx) {
  if (ctx.app && ctx.app.config && ctx.app.config.auth) {
    return ctx.app.config.auth;
  }
  return {};
}

const ENDPOINT_TYPE = 'public';
module.exports = {
  get keystone() {
    const config = getAuthConfig(this);
    return config.keystone;
  },

  get domain() {
    const config = getAuthConfig(this);
    return config.domain;
  },
  
  set remotes(catalogs) {
    const dict = {};
    catalogs.forEach(catalog => {
      const cataType = catalog.cataType;
      dict[cataType] = {
        "name": name,
        "type": catalog.type,
        "remotes": {},
      };
      catalog.endpoints.forEach(endpoint => {
        const type = endpoint.interface;
        if (type === ENDPOINT_TYPE) {
          const regionId = endpoint['region_id'];
          dict[cataType].remotes[regionId] = endpoint.url;
        }
      });
    });

    this.session.remotes = dict;
  },
  get remotes() {
    return this.session.remotes;
  },
  get user() {
    return this.session.user;
  },
  set user(value) {
    this.session.user = value;
  },
  get project() {
    return this.session.project;
  },
  set project(value) {
    this.session.project = value;
  },
  get issue_at() {
    return this.session.issue_at;
  },
  set issue_at(value) {
    this.session.issue_at = value;
  },
  get token() {
    return this.session.token;
  },
  set token(value) {
    this.session.token = value;
  },
  get region() {
    return this.session.region;
  },
  set region(value) {
    this.session.region = value;
  },
  
}
