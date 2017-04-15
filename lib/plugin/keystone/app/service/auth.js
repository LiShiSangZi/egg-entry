'use strict';

const request = require('superagent');


async function unscopedAuth(username, password, remote, domain) {
  const res = await request.post(`${remote}/v3/auth/tokens`)
    .send({
      'auth': {
        'scope': {
          'unscoped': {}
        },
        'identity': {
          'methods': [
            'password'
          ],
          'password': {
            'user': {
              'name': username,
              'domain': {
                'name': domain
              },
              'password': password
            }
          }
        }
      }
    });

  return {
    token: res.headers['x-subject-token'],
    user: res.body.token.user
  };
}

async function scopedAuth(projectId, token, remote) {
  const res = await request.post(`${remote}/v3/auth/tokens`)
    .send({
      'auth': {
        'scope': {
          'project': {
            'id': projectId
          }
        },
        'identity': {
          'token': {
            'id': token
          },
          'methods': [
            'token'
          ]
        }
      }
    });
  return {
    token: res.headers['x-subject-token'],
    detail: res.body.token,
  };
}

module.exports = app => {
  class Auth extends app.Service {
    async doAuth(username, password, remote, domain) {
      const res = await unscopedAuth(username, password, remote, domain);
      const userId = res.user.id;
      const projects = await this.service.project.listUserProject(userId, remote, res.token);

      if (projects.length < 1) {
        throw new Error('You donot have a valid project!');
      } else {
        let projectId = projects[0].id;
        projects.some(p => {
          if (p.name === username || p.name === username + '_project') {
            projectId = p.id;
            return true;
          }
        });

        const detailResult = await scopedAuth(projectId, res.token, remote);
        console.log(detailResult);
        // Parse the endpoints:
        this.ctx.catalog = detailResult.detail.catalog;
      }
    }
  }
  return Auth;
}
