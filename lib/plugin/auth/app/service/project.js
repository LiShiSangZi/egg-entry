'use strict';

const request = require('superagent');

module.exports = app => {
  class Project extends app.Service {
    async listProject(remote, token) {
      return request.get(`${remote}/v3/projects`)
        .set('X-Auth-Token', token);
    }
    async listUserProject(userId, remote, token) {
      const res = await request.get(`${remote}/v3/users/${userId}/projects`)
        .set('X-Auth-Token', token);
      return res.body.projects;
    }
  }
  return Project;
}
