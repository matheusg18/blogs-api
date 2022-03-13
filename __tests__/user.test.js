const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const shell = require('shelljs');
const app = require('../src/index');
const fakeData = require('./fakeData');

chai.use(chaiHttp);
const { expect } = chai;

describe('/user Testes', () => {
  beforeEach(() => {
    shell.exec('npx sequelize --env test db:create');
    shell.exec('npx sequelize --env test db:migrate');
    shell.exec('npx sequelize --env test db:seed:all');
  });

  afterEach(() => {
    shell.exec('npx sequelize --env test db:drop');
  });

  describe('POST /user', () => {
    describe('ao cadastrar um usuário com sucesso', () => {
      it('deve retornar um token (JWT) com status 201', async () => {
        const { body, status } = await chai
          .request(app)
          .post('/user')
          .send(fakeData.userPostRequest);

        expect(status).to.be.equal(201);
        expect(body).to.have.property('token');
        expect(() => {
          jwt.verify(body.token, process.env.JWT_SECRET);
        }).to.not.throw();
      });
    });
  });
});
