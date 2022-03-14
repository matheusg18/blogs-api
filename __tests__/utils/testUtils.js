const shell = require('shelljs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/index');
const { loginPostRequest } = require('./fakeData');

chai.use(chaiHttp);

shell.config.silent = true;
shell.config.fatal = true;

module.exports = {
  startDB: () => {
    shell.exec('npx sequelize --env test db:create');
    shell.exec('npx sequelize --env test db:migrate');
    shell.exec('npx sequelize --env test db:seed:all');
  },

  dropDB: () => {
    shell.exec('npx sequelize --env test db:drop');
  },

  getToken: async () => (await chai.request(app).post('/login').send(loginPostRequest)).body.token,
};
